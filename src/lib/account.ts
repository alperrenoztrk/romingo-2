export interface ProfileSettings {
  fullName: string;
  username: string;
  avatar: string;
}

export interface SecuritySettings {
  passwordLastUpdated: string;
  twoFactorAuth: boolean;
  loginAlerts: boolean;
}

export const PROFILE_SETTINGS_KEY = "romingo_profile_settings";
export const SECURITY_SETTINGS_KEY = "romingo_security_settings";

export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = {
  fullName: "Alperren",
  username: "@alperren",
  avatar: "🦩",
};

export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  passwordLastUpdated: "12 gün önce",
  twoFactorAuth: false,
  loginAlerts: true,
};

export function getStoredProfileSettings(): ProfileSettings {
  const raw = localStorage.getItem(PROFILE_SETTINGS_KEY);
  if (!raw) return DEFAULT_PROFILE_SETTINGS;

  try {
    const parsed = JSON.parse(raw) as Partial<ProfileSettings>;

    return {
      fullName: parsed.fullName ?? DEFAULT_PROFILE_SETTINGS.fullName,
      username: parsed.username ?? DEFAULT_PROFILE_SETTINGS.username,
      avatar: parsed.avatar ?? DEFAULT_PROFILE_SETTINGS.avatar,
    };
  } catch {
    return DEFAULT_PROFILE_SETTINGS;
  }
}

export function saveProfileSettings(settings: ProfileSettings) {
  localStorage.setItem(PROFILE_SETTINGS_KEY, JSON.stringify(settings));
}

export function getStoredSecuritySettings(): SecuritySettings {
  const raw = localStorage.getItem(SECURITY_SETTINGS_KEY);
  if (!raw) return DEFAULT_SECURITY_SETTINGS;

  try {
    const parsed = JSON.parse(raw) as Partial<SecuritySettings>;

    return {
      passwordLastUpdated: parsed.passwordLastUpdated ?? DEFAULT_SECURITY_SETTINGS.passwordLastUpdated,
      twoFactorAuth: parsed.twoFactorAuth ?? DEFAULT_SECURITY_SETTINGS.twoFactorAuth,
      loginAlerts: parsed.loginAlerts ?? DEFAULT_SECURITY_SETTINGS.loginAlerts,
    };
  } catch {
    return DEFAULT_SECURITY_SETTINGS;
  }
}

export function saveSecuritySettings(settings: SecuritySettings) {
  localStorage.setItem(SECURITY_SETTINGS_KEY, JSON.stringify(settings));
}
