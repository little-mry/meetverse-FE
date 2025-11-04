const RAW_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';
const BASE_URL = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

export const api = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${BASE_URL}${path}`, {...options, headers });
  const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data?.message || `HTTP ${response.status}`);
    }
    return data as T;
};
