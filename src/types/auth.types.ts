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
