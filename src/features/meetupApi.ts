export type ReviewData = {
  meetupId: string;
  rating: number;
  text?: string;
};

export type ReviewResponse = {
  status: string;
  message: string;
  data: {meetup: unknown};
  review: {
    rating: number;
    text?: string;
  };
};

const API_URL = '/meetups';

export const postReview = async ({ meetupId, rating, text }: ReviewData, token: string): Promise<ReviewResponse> => {
  const response = await fetch(`${API_URL}/${meetupId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({rating, text}),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Posting review failed');
  }
  return data as ReviewResponse;
};
