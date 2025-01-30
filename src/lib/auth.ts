export interface User {
  username: string;
  email: string;
  password: string;
}

export function getStoredUser(): User | null {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getStoredUser() !== null;
}

export function logout(): void {
  localStorage.removeItem("user");
}
