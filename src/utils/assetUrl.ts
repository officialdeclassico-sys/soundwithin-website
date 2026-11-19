/**
 * Resolves a public static asset path against Vite's configured BASE_URL
 * (e.g. '/' in local development and '/soundwithin-website/' on GitHub Pages).
 */
export function withBaseUrl(assetPath: string): string {
  if (!assetPath) return assetPath;
  if (/^(https?:|data:|blob:|mailto:|tel:)/i.test(assetPath)) {
    return assetPath;
  }
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = assetPath.startsWith('/')
    ? assetPath.slice(1)
    : assetPath;
  return `${normalizedBase}${normalizedPath}`;
}
