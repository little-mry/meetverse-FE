import { api } from './apiClient';

export type ReviewResponse = {
  status: string;
  message: string;
  data: { meetup: unknown };
  review: {
    rating: number;
    text?: string;
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
  reviews: [{ userId: string; rating: number; text?: string }];
};

export const fetchMeetupById = async (id: string): Promise<Meetup> => {
  return api<Meetup>(`/meetups/${id}`, { method: 'GET' });
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
