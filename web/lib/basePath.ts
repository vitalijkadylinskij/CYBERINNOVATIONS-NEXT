function normalizeBasePath(path?: string): string {
  if (!path) {
    return "";
  }

  const trimmedPath = path.trim();
  if (!trimmedPath || trimmedPath === "/") {
    return "";
  }

  return `/${trimmedPath.replace(/^\/+|\/+$/g, "")}`;
}

function normalizeSiteUrl(url?: string): string | undefined {
  if (!url) {
    return undefined;
  }

  const trimmedUrl = url.trim().replace(/\/+$/, "");
  return trimmedUrl || undefined;
}

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
export const siteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
  (process.env.NODE_ENV === "production"
    ? "https://localhost"
    : "http://localhost:3000");

export function withBasePath(path: string): string {
  if (!path) {
    return basePath || "/";
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return basePath ? `${basePath}${normalizedPath}` : normalizedPath;
}
