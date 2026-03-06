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

export const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://vitalijkadylinskij.github.io"
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
