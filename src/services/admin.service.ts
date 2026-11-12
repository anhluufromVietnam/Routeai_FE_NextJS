export interface AdminProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'superadmin';
}

export interface SystemConfig {
  ocr: { provider: string; model: string; apiKeyConfigured: boolean; endpoint: string };
  voice: { provider: string; model: string; apiKeyConfigured: boolean; language: string; endpoint: string };
  maps: { mapUrl: string; tileProvider: string; apiKeyConfigured: boolean };
  tokens: { ocrApiKeyHint: string; voiceApiKeyHint: string; mapApiKeyHint: string };
  features: { qrScanEnabled: boolean; voiceInputEnabled: boolean; offlineMode: boolean };
}

export interface ConfigPatch {
  ocr?: { provider?: string; model?: string; endpoint?: string };
  voice?: { provider?: string; model?: string; language?: string; endpoint?: string };
  maps?: { mapUrl?: string; tileProvider?: string };
  features?: { qrScanEnabled?: boolean; voiceInputEnabled?: boolean; offlineMode?: boolean };
}
export interface ManagedUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
  language_pref: string;
  disabled?: boolean;
}

const ADMIN_TOKEN_KEY = 'admin_access_token';

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

async function handleResponse(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    const message = data.error?.message || 'An error occurred';
    throw { status: response.status, message: `[${data.error?.code || response.status}] ${message}`, code: data.error?.code };
  }
  return data;
}

function authHeaders(): HeadersInit {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const adminService = {
  async login(payload: { email: string; password: string }) {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await handleResponse(res);
    if (data?.data?.access_token) setAdminToken(data.data.access_token);
    return data;
  },

  async logout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST', headers: { ...authHeaders() } });
    } finally {
      clearAdminToken();
    }
  },

  async getProfile(): Promise<{ success: boolean; data: AdminProfile }> {
    const res = await fetch('/api/admin/me', { headers: { ...authHeaders() } });
    return handleResponse(res);
  },

  async getConfig(): Promise<{ success: boolean; data: SystemConfig }> {
    const res = await fetch('/api/admin/config', { headers: { ...authHeaders() } });
    return handleResponse(res);
  },

  async updateConfig(patch: ConfigPatch): Promise<{ success: boolean; data: SystemConfig }> {
    const res = await fetch('/api/admin/config', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(patch),
    });
    return handleResponse(res);
  },

  async listUsers(): Promise<{ success: boolean; data: ManagedUser[] }> {
    const res = await fetch('/api/admin/users', { headers: { ...authHeaders() } });
    return handleResponse(res);
  },

  async updateUser(id: string, patch: { role?: string; disabled?: boolean }): Promise<{ success: boolean; data: ManagedUser }> {
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ id, ...patch }),
    });
    return handleResponse(res);
  },
};
