import { api } from './apiClient';
import type { UserProfile } from '../types/api.types';

export const getUserProfile = (): Promise<UserProfile> => {
  return api<UserProfile>('/user/me', { method: 'GET' });
};
