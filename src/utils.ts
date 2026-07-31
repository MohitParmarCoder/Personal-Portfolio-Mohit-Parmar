/**
 * Resolves a file in `public/` against the configured Vite base path so links
 * keep working under the `/Personal-Portfolio-Mohit-Parmar/` GitHub Pages prefix.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
