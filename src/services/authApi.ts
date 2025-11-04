import { api } from './apiClient';

export type LoginCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = {
  username: string;
  email: string;
  password: string;
};

export interface AuthResponse {
  message: string;
  token: string;
  user: string;
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const path = '/user/login';

  return api<AuthResponse>(path, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const path = '/user/register';

  return api<AuthResponse>(path, {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};
