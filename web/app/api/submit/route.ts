import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const BOT_SENDER_URL = process.env.BOT_SENDER_URL || 'http://bot-sender:3001';
const INTERNAL_HMAC_SECRET = process.env.INTERNAL_HMAC_SECRET || '';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || '';

const MAX_REQUEST_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 10;
const ALLOWED_ROLES = new Set(['company', 'government', 'partner', 'media', 'expert', 'volunteer']);
const ALLOWED_REQUEST_FIELDS = new Set([
  'company',
  'name',
  'email',
  'phone',
  'role',
  'message',
  'honeypot',
  'timestamp',
  'formStartedAt',
  'captchaToken',
]);

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

type SubmitRequestBody = {
  company: string;
  name: string;
  email: string;
  phone: string;
  role?: string;
  message?: string;
  honeypot?: string;
  timestamp: number | string;
  formStartedAt?: number | string;
  captchaToken: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeString(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

function hasControlChars(value: string): boolean {
  return /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value);
}

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || 'unknown';
  }

  return request.headers.get('x-real-ip') || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  return true;
}

function checkHoneypot(data: SubmitRequestBody): boolean {
  return typeof data.honeypot !== 'string' || data.honeypot.trim().length === 0;
}

function checkFormFillTime(data: SubmitRequestBody): boolean {
  const startedAt = Number(data.formStartedAt ?? data.timestamp);
  if (!startedAt || Number.isNaN(startedAt)) {
    return false;
  }

  return Date.now() - startedAt >= 3000;
}

function validateFormData(data: Record<string, unknown>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (Object.keys(data).some((field) => !ALLOWED_REQUEST_FIELDS.has(field))) {
    errors.push('Unexpected fields are not allowed');
  }

  for (const value of Object.values(data)) {
    if (value !== null && typeof value === 'object') {
      errors.push('Nested payloads are not allowed');
      break;
    }
  }

  const company = typeof data.company === 'string' ? normalizeString(data.company) : '';
  const name = typeof data.name === 'string' ? normalizeString(data.name) : '';
  const email = typeof data.email === 'string' ? normalizeString(data.email) : '';
  const phone = typeof data.phone === 'string' ? normalizeString(data.phone) : '';
  const role = typeof data.role === 'string' ? data.role.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';
  const captchaToken = typeof data.captchaToken === 'string' ? data.captchaToken.trim() : '';

  const allowedNameChars = /^[\p{L}\p{N}\s\-.,!?@&"'«»()\/+:#№]+$/u;
  const phoneRegex = /^[0-9+()\-\s]{5,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof data.company !== 'string' || company.length < 2 || company.length > 100) {
    errors.push('Company name is required (2-100 characters)');
  } else if (hasControlChars(company) || !allowedNameChars.test(company)) {
    errors.push('Company name contains invalid characters');
  }

  if (typeof data.name !== 'string' || name.length < 2 || name.length > 100) {
    errors.push('Contact name is required (2-100 characters)');
  } else if (hasControlChars(name) || !allowedNameChars.test(name)) {
    errors.push('Contact name contains invalid characters');
  }

  if (typeof data.email !== 'string' || email.length < 5 || email.length > 254) {
    errors.push('Email is required');
  } else if (hasControlChars(email) || !emailRegex.test(email)) {
    errors.push('Invalid email format');
  }

  if (typeof data.phone !== 'string' || phone.length < 5 || phone.length > 30) {
    errors.push('Phone number is required');
  } else if (hasControlChars(phone) || !phoneRegex.test(phone)) {
    errors.push('Invalid phone format');
  }

  if (data.role !== undefined) {
    if (typeof data.role !== 'string' || !ALLOWED_ROLES.has(role)) {
      errors.push('Invalid role');
    }
  }

  if (data.message !== undefined) {
    if (typeof data.message !== 'string' || message.length > 1000 || hasControlChars(message)) {
      errors.push('Message is invalid');
    }
  }

  if (data.honeypot !== undefined && typeof data.honeypot !== 'string') {
    errors.push('Invalid honeypot');
  }

  if (typeof data.timestamp !== 'number' && typeof data.timestamp !== 'string') {
    errors.push('Invalid timestamp');
  }

  if (data.formStartedAt !== undefined && typeof data.formStartedAt !== 'number' && typeof data.formStartedAt !== 'string') {
    errors.push('Invalid form start time');
  }

  if (typeof data.captchaToken !== 'string' || captchaToken.length < 10 || captchaToken.length > 4096) {
    errors.push('Invalid CAPTCHA token');
  }

  return { valid: errors.length === 0, errors };
}

async function verifyCaptcha(token: string): Promise<boolean> {
  if (!token || !RECAPTCHA_SECRET) {
    console.error('No captcha token received or missing RECAPTCHA_SECRET');
    return false;
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(RECAPTCHA_SECRET)}&response=${encodeURIComponent(token)}`,
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('CAPTCHA verification error:', error);
    return false;
  }
}

function generateSignature(body: string, timestamp: string): string {
  return crypto.createHmac('sha256', INTERNAL_HMAC_SECRET).update(body + '.' + timestamp).digest('hex');
}

function generateRequestId(): string {
  return crypto.randomBytes(16).toString('hex');
}

function methodNotAllowed() {
  return NextResponse.json({ error: 'Method not allowed' }, {
    status: 405,
    headers: { Allow: 'POST, OPTIONS' },
  });
}

export async function POST(request: NextRequest) {
  if (!INTERNAL_HMAC_SECRET || !RECAPTCHA_SECRET) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const requestId = generateRequestId();
  const clientIp = getClientIp(request);

  console.log(JSON.stringify({ timestamp: new Date().toISOString(), request_id: requestId, ip: clientIp, outcome: 'started' }));

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), request_id: requestId, ip: clientIp, outcome: 'rejected', error_code: 'INVALID_CONTENT_TYPE' }));
    return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
  }

  const contentLengthHeader = request.headers.get('content-length');
  if (contentLengthHeader) {
    const contentLength = Number.parseInt(contentLengthHeader, 10);
    if (!Number.isNaN(contentLength) && contentLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }
  }

  if (!checkRateLimit(clientIp)) {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), request_id: requestId, ip: clientIp, outcome: 'rejected', error_code: 'RATE_LIMIT_EXCEEDED' }));
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const rawBody = await request.text();
    if (!rawBody) {
      return NextResponse.json({ error: 'Empty request body' }, { status: 400 });
    }

    if (Buffer.byteLength(rawBody, 'utf8') > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    const parsedBody = JSON.parse(rawBody) as unknown;
    if (!isPlainObject(parsedBody)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const body = parsedBody as Record<string, unknown>;

    if (!body.timestamp || Math.abs(Date.now() - Number(body.timestamp)) > 5 * 60 * 1000) {
      return NextResponse.json({ error: 'Invalid request timestamp' }, { status: 400 });
    }

    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });
    }

    const typedBody = body as SubmitRequestBody;

    if (!checkHoneypot(typedBody)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!checkFormFillTime(typedBody)) {
      return NextResponse.json({ error: 'Please fill out the form properly' }, { status: 400 });
    }

    const captchaValid = await verifyCaptcha(typedBody.captchaToken);
    if (!captchaValid) {
      return NextResponse.json({ error: 'Invalid CAPTCHA' }, { status: 400 });
    }

    const normalizedData = {
      company: normalizeString(typedBody.company),
      name: normalizeString(typedBody.name),
      email: normalizeString(typedBody.email),
      phone: normalizeString(typedBody.phone),
      role: typedBody.role ? normalizeString(typedBody.role) : '',
      message: typedBody.message ? normalizeString(typedBody.message) : '',
    };

    const timestampHeader = Date.now().toString();
    const bodyString = JSON.stringify(normalizedData);
    const signature = generateSignature(bodyString, timestampHeader);

    const botResponse = await fetch(`${BOT_SENDER_URL}/internal/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Timestamp': timestampHeader,
        'X-Signature': signature,
        'X-Idempotency-Key': requestId,
      },
      body: bodyString,
      signal: AbortSignal.timeout(30000),
    });

    const botResult = await botResponse.json().catch(() => null);
    if (!botResponse.ok || !botResult?.ok) {
      return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 503 });
    }

    return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      (error.name === 'TimeoutError' || ('code' in error && error.code === 'ETIMEDOUT'))
    ) {
      return NextResponse.json({ error: 'Request timeout. Please try again.' }, { status: 503 });
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { Allow: 'POST, OPTIONS' },
  });
}

export async function GET() {
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}
