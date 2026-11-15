/**
 * Slug and URL utilities for SEO-friendly name-based routing.
 * Supports multilingual names including Arabic, German (with umlauts), and English.
 */

/**
 * Converts an entity name into a URL-friendly slug.
 * If name is empty or null, falls back to the provided ID.
 */
export function toUrlSlug(name?: string | null, fallbackId?: number | string): string {
  if (!name || !name.trim()) {
    return fallbackId !== undefined && fallbackId !== null ? String(fallbackId) : "";
  }

  const cleaned = name
    .trim()
    // Replace slashes, backslashes, underscores, and whitespace with single hyphen
    .replace(/[\s/\\_]+/g, "-")
    // Keep Unicode letters, numbers, and hyphens (stripping special symbols, punctuation)
    .replace(/[^\p{L}\p{N}-]+/gu, "")
    // Collapse consecutive hyphens
    .replace(/-+/g, "-")
    // Trim hyphens from both ends
    .replace(/^-+|-+$/g, "");

  if (!cleaned) {
    return fallbackId !== undefined && fallbackId !== null ? String(fallbackId) : "";
  }

  return encodeURIComponent(cleaned.toLowerCase());
}

/**
 * Normalizes a string for loose, case-insensitive, Unicode-aware comparison.
 */
function normalizeForComparison(val: string): string {
  try {
    val = decodeURIComponent(val);
  } catch {
    // Keep raw value if URI decoding fails
  }

  return val
    .trim()
    .toLowerCase()
    .replace(/[\s/\\_-]+/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

/**
 * Checks if a candidate entity name matches a route parameter (which could be a slug or raw name).
 */
export function matchesSlugOrName(
  candidateName?: string | null,
  routeParam?: string | null
): boolean {
  if (!candidateName || !routeParam) return false;

  const normalizedCandidate = normalizeForComparison(candidateName);
  const normalizedParam = normalizeForComparison(routeParam);

  if (!normalizedCandidate || !normalizedParam) return false;

  return normalizedCandidate === normalizedParam;
}

/**
 * Attempts to parse a strictly numeric ID from a route parameter string.
 * Returns the numeric ID if the string consists solely of digits, otherwise null.
 */
export function parseNumericId(routeParam?: string | null): number | null {
  if (!routeParam) return null;
  const decoded = decodeURIComponent(routeParam).trim();
  if (/^\d+$/.test(decoded)) {
    const parsed = parseInt(decoded, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
  }
  return null;
}
