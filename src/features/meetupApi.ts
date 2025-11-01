import { api } from "./apiClient";

export type ReviewResponse = {
  status: string;
  message: string;
  data: {meetup: unknown};
  review: {
    rating: number;
    text?: string;
  };
};


export const postReview = async (meetupId: string, rating: number, text?: string): Promise<ReviewResponse> => {
  return api<ReviewResponse>(`/meetups/${meetupId}/reviews`, {
    method: 'POST',
    body: JSON.stringify({ rating, text }),
  });
};
