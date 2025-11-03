const BASE_URL = '/api';

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
