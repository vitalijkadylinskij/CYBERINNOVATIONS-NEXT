import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';

// Конфигурация
const BOT_SENDER_URL = process.env.BOT_SENDER_URL || 'http://bot-sender:3001';

// Читаем INTERNAL_HMAC_SECRET из переменной окружения или файла
let INTERNAL_HMAC_SECRET = process.env.INTERNAL_HMAC_SECRET || '';
const hmacSecretFile = process.env.INTERNAL_HMAC_SECRET_FILE;
if (!INTERNAL_HMAC_SECRET && hmacSecretFile) {
  try {
    INTERNAL_HMAC_SECRET = fs.readFileSync(hmacSecretFile, 'utf8').trim();
  } catch (e) {
    console.error('Failed to read HMAC secret file:', e);
  }
}

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || '';

// In-memory rate limiting (production используйте Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута
const RATE_LIMIT_MAX = 10; // максимум 10 запросов в минуту

// Валидация полей формы
function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.company || typeof data.company !== 'string' || data.company.length < 2) {
    errors.push('Company name is required (min 2 characters)');
  }
  if (!data.name || typeof data.name !== 'string' || data.name.length < 2) {
    errors.push('Contact name is required (min 2 characters)');
  }
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }
  if (!data.phone || typeof data.phone !== 'string' || data.phone.length < 5) {
    errors.push('Phone number is required (min 5 characters)');
  }
  if (data.company && data.company.length > 100) errors.push('Company name is too long (max 100 characters)');
  if (data.name && data.name.length > 100) errors.push('Contact name is too long (max 100 characters)');
  if (data.message && data.message.length > 1000) errors.push('Message is too long (max 1000 characters)');

  const allowedChars = /^[a-zA-Z0-9а-яА-ЯёЁ\s\-.,!?@]+$/;
  if (data.company && !allowedChars.test(data.company)) {
    errors.push('Company name contains invalid characters');
  }

  return { valid: errors.length === 0, errors };
}

// Rate limiting
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (record.count >= RATE_LIMIT_MAX) return false;

  record.count++;
  return true;
}

// Honeypot
function checkHoneypot(data: any): boolean {
  return !(data.honeypot && data.honeypot.length > 0);
}

// Минимальное время заполнения формы
function checkFormFillTime(data: any): boolean {
  if (!data.timestamp || isNaN(Number(data.timestamp))) return false;
  return Date.now() - Number(data.timestamp) >= 3000;
}

// CAPTCHA проверка
async function verifyCaptcha(token: string): Promise<boolean> {
  if (!token || !process.env.RECAPTCHA_SECRET) {
    console.error('No captcha token received or missing RECAPTCHA_SECRET')
    return false
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
      }
    )

    const data = await response.json()
    console.log('RECAPTCHA response:', data)
    return data.success === true
  } catch (error) {
    console.error('CAPTCHA verification error:', error)
    return false
  }
}

// Нормализация
function normalizeString(str: string): string {
  return str.trim().replace(/\s+/g, ' ');
}

// HMAC подпись
function generateSignature(body: string, timestamp: string): string {
  return crypto.createHmac('sha256', INTERNAL_HMAC_SECRET).update(body + '.' + timestamp).digest('hex');
}

// Request ID
function generateRequestId(): string {
  return crypto.randomBytes(16).toString('hex');
}

export async function POST(request: NextRequest) {
  if (!INTERNAL_HMAC_SECRET) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const requestId = generateRequestId();
  const timestamp = Date.now();
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  console.log(JSON.stringify({ timestamp: new Date().toISOString(), request_id: requestId, ip: clientIp, outcome: 'started' }));

  const contentType = request.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), request_id: requestId, ip: clientIp, outcome: 'rejected', error_code: 'INVALID_CONTENT_TYPE' }));
    return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 415 });
  }

  if (!checkRateLimit(clientIp)) {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), request_id: requestId, ip: clientIp, outcome: 'rejected', error_code: 'RATE_LIMIT_EXCEEDED' }));
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json();

    // Timestamp проверка на replay
    if (!body.timestamp || Math.abs(Date.now() - Number(body.timestamp)) > 5 * 60 * 1000) {
      return NextResponse.json({ error: 'Invalid request timestamp' }, { status: 400 });
    }

    if (!checkHoneypot(body)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    if (!checkFormFillTime(body)) {
      return NextResponse.json({ error: 'Please fill out the form properly' }, { status: 400 });
    }

    if (!body.captchaToken) {
      return NextResponse.json({ error: 'CAPTCHA required' }, { status: 400 });
    }

    const captchaValid = await verifyCaptcha(body.captchaToken);
    if (!captchaValid) return NextResponse.json({ error: 'Invalid CAPTCHA' }, { status: 400 });

    const validation = validateFormData(body);
    if (!validation.valid) return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });

    const normalizedData = {
      company: normalizeString(body.company),
      name: normalizeString(body.name),
      email: normalizeString(body.email),
      phone: normalizeString(body.phone),
      role: body.role ? normalizeString(body.role) : '',
      message: body.message ? normalizeString(body.message) : '',
    };

    const timestampHeader = timestamp.toString();
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

    const botResult = await botResponse.json();

    if (!botResponse.ok || !botResult.ok) {
      return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 503 });
    }

    return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });

  } catch (error: any) {
    if (error.name === 'TimeoutError' || error.code === 'ETIMEDOUT') {
      return NextResponse.json({ error: 'Request timeout. Please try again.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Отклоняем другие методы
export async function GET() { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }
export async function PUT() { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }
export async function DELETE() { return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); }

