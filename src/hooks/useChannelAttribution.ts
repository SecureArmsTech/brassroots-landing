import { useEffect } from "react";

// Custom hook: Sets 'br_src' in localStorage on first visit.
// - Reads from ?src= or ?utm_source= in the URL.
// - Falls back to "direct" if not present.
// - Never overwrites an existing value.
export function useChannelAttribution() {
    useEffect(() => {
        if (typeof window === "undefined") return;

        if (!localStorage.getItem("br_src")) {
            const params = new URLSearchParams(window.location.search);
            const source =
                params.get("src") ||
                params.get("utm_source") ||
                "direct";
            localStorage.setItem("br_src", source);
        }
    }, []);
}
