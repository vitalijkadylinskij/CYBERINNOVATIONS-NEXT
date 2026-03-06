export const basePath = process.env.NODE_ENV === "production" ? "/CYBERINNOVATIONS-NEXT" : "";
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
