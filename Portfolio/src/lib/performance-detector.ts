// Client-side lightweight device and performance capability detector
// Zero external dependencies, safe against SSR/hydration mismatches

export interface PerformanceTier {
  isLowTier: boolean;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  hasSeenIntro: boolean;
}

const INTRO_SEEN_KEY = "rk_intro_seen_session";

export function getStoredIntroSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

export function setStoredIntroSeen(seen: boolean = true): void {
  if (typeof window === "undefined") return;
  try {
    if (seen) {
      sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } else {
      sessionStorage.removeItem(INTRO_SEEN_KEY);
    }
  } catch {
    // Fallback if sessionStorage is disabled or restricted
  }
}

export function detectPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") {
    return {
      isLowTier: false,
      isMobile: false,
      prefersReducedMotion: false,
      hasSeenIntro: false,
    };
  }

  const isMobile = window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Check hardware specs if exposed by browser
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  const isLowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const isLowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  const isSlowNetwork = Boolean(
    nav.connection && (nav.connection.saveData || /2g|3g/.test(nav.connection.effectiveType || ""))
  );

  const isLowTier = isLowMemory || (isMobile && isLowCpu) || isSlowNetwork || prefersReducedMotion;
  const hasSeenIntro = getStoredIntroSeen();

  // Apply low-power CSS class to document root to tune down heavy GPU filters
  if (isLowTier) {
    document.documentElement.classList.add("low-power-mode");
  }

  return {
    isLowTier,
    isMobile,
    prefersReducedMotion,
    hasSeenIntro,
  };
}
