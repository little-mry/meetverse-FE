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
