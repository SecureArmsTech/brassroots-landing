// src/lib/attribution.ts

/**
 * Initializes the br_src UTM attribution:
 * - On first visit, defaults to "direct"
 * - Overrides whenever utm_source is present in the URL
 */
export function initAttribution(): void {
    if (typeof window === 'undefined') return;

    const key = 'br_src';
    const params = new URLSearchParams(window.location.search);
    const utm = params.get('utm_source');
    const existing = localStorage.getItem(key);

    // Default to “direct” if not set
    if (!existing) {
        localStorage.setItem(key, 'direct');
    }

    // Override on fresh UTM visits
    if (utm) {
        localStorage.setItem(key, utm);
    }
}
