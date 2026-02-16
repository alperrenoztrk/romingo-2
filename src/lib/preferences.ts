export interface UserPreferences {
  notifications: boolean;
  darkMode: boolean;
  dailyReminder: boolean;
}

export const PREFERENCES_KEY = "romingo_user_preferences";

export const DEFAULT_PREFERENCES: UserPreferences = {
  notifications: true,
  darkMode: false,
  dailyReminder: true,
};

export function getStoredPreferences(): UserPreferences {
  const rawPreferences = localStorage.getItem(PREFERENCES_KEY);
  if (!rawPreferences) return DEFAULT_PREFERENCES;

  try {
    const parsed = JSON.parse(rawPreferences) as Partial<UserPreferences>;

    return {
      notifications: parsed.notifications ?? DEFAULT_PREFERENCES.notifications,
      darkMode: parsed.darkMode ?? DEFAULT_PREFERENCES.darkMode,
      dailyReminder: parsed.dailyReminder ?? DEFAULT_PREFERENCES.dailyReminder,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(preferences: UserPreferences) {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
}

export function applyDarkMode(enabled: boolean) {
  document.documentElement.classList.toggle("dark", enabled);
}
