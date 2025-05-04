// src/hooks/useChannelAttribution.ts

import { useEffect } from "react";

/**
 * Custom hook to initialize and maintain the `br_src` UTM/source tag in localStorage.
 *
 * Behavior:
 * 1. On very first visit (no `br_src` in storage), sets to:
 *    - the URL param `src` (e.g. `?src=reddit`), or
 *    - the URL param `utm_source`, or
 *    - `"direct"` if neither is present.
 * 2. On any subsequent visit, if a fresh `src` or `utm_source` param is present,
 *    it **overwrites** the existing value to reflect the new channel.
 * 3. If neither a fresh param nor a missing key, leaves the existing value intact.
 */
export function useChannelAttribution(): void {
    useEffect(() => {
        if (typeof window === "undefined") return;

        const storageKey = "br_src";
        const params = new URLSearchParams(window.location.search);
        const srcParam = params.get("src") || params.get("utm_source");
        const existing = localStorage.getItem(storageKey);

        if (!existing) {
            // First-time visitor: set default or UTM value
            localStorage.setItem(storageKey, srcParam ?? "direct");
        } else if (srcParam) {
            // Override on fresh UTM/source arrival
            localStorage.setItem(storageKey, srcParam);
        }
    }, []);
}
