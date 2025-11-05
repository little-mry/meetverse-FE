import { api } from './apiClient';
import type { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth.types';

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
