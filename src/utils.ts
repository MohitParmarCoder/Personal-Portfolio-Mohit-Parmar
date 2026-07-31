/**
 * Resolves a file in `public/` against the configured Vite base path so links
 * keep working under the `/Personal-Portfolio-Mohit-Parmar/` GitHub Pages prefix.
 */
export function asset(path: string): string {
  // Already-absolute URLs (including inlined data: URIs) are used untouched.
  if (/^(https?:|data:|\/\/)/.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
