import { api } from './apiClient';
import type { Meetup, ReviewResponse } from '../types/meetup.types';

export const fetchAllMeetups = async (): Promise<Meetup[]> => {
  return api<Meetup[]>('/meetups', { method: 'GET' });
};

export const fetchMeetupById = async (id: string): Promise<Meetup> => {
  return api<Meetup>(`/meetups/${id}`, { method: 'GET' });
};

export const registerToMeetup = async (id: string): Promise<{ ok: true }> => {
  return api<{ ok: true }>(`/meetups/${id}/register`, { method: 'POST' });
};

export const unregisterFromMeetup = async (id: string): Promise<{ ok: true }> => {
  return api<{ ok: true }>(`/meetups/${id}/register`, { method: 'DELETE' });
};

export const postReview = async (
  meetupId: string,
  rating: number,
  text?: string,
): Promise<ReviewResponse> => {
  return api<ReviewResponse>(`/meetups/${meetupId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({ rating, text }),
  });
};
