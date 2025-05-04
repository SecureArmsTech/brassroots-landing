// src/lib/attribution.ts

/**
 * Initializes the br_src UTM attribution:
 * 1. On very first visit (no `br_src` in storage), sets to:
 *    • the URL param `src` (e.g. `?src=reddit`), or
 *    • the URL param `utm_source`, or
 *    • `"direct"` if neither is present.
 * 2. On any subsequent visit, if a fresh `src` or `utm_source` param is present,
 *    it overrides the existing value to reflect the new channel.
 */
export function initAttribution(): void {
    if (typeof window === 'undefined') return;

    const key = 'br_src';
    const params = new URLSearchParams(window.location.search);

    // Check both `src` and classic UTM
    const sourceParam = params.get('src') || params.get('utm_source');
    const existing = localStorage.getItem(key);

    // 1) Default on very first visit
    if (!existing) {
        localStorage.setItem(key, sourceParam ?? 'direct');
    }

    // 2) Override on fresh UTM/src visits
    if (sourceParam) {
        localStorage.setItem(key, sourceParam);
    }
}
