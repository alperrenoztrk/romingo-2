const ACTIVE_PROFILE_SCOPE_KEY = "romingo.profile.activeScope.v1";
const GUEST_SCOPE = "guest";

export function getActiveProfileScope() {
  if (typeof window === "undefined") {
    return GUEST_SCOPE;
  }

  return window.localStorage.getItem(ACTIVE_PROFILE_SCOPE_KEY) ?? GUEST_SCOPE;
}

export function setActiveProfileScope(scope: string | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!scope) {
    window.localStorage.removeItem(ACTIVE_PROFILE_SCOPE_KEY);
    return;
  }

  window.localStorage.setItem(ACTIVE_PROFILE_SCOPE_KEY, scope);
}
