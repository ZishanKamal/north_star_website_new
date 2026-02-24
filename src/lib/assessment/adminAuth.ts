const ADMIN_AUTH_KEY = 'admin_authenticated';

export function setAdminAuthenticated(value: boolean) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(ADMIN_AUTH_KEY, value ? 'true' : 'false');
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  }
  return false;
}

export function clearAdminAuthentication() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}

export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "NorthStar2025Admin";
  return password === adminPassword;
}
