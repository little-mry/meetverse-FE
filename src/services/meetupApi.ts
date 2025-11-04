import { api } from './apiClient';

export type ReviewResponse = {
  status: string;
  message: string;
  data: { meetup: unknown };
  review: {
    rating: number;
    text?: string;
    username: string;
  };
};

export type Meetup = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  location?: { city: string; address: string; lat: number; long: number };
  date: string[];
  time?: string;
  capacity: number;
  registrations: string[];
  reviews: [{ userId: string; username: string; rating: number; text?: string }];
};

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
