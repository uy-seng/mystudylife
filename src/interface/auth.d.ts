export interface UserPayload {
  id: string;
  email: string | null;
  username: string;
  provider: string | null;
  tokenVersion: number;
}
