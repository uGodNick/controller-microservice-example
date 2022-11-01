export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  imageUrl: string;
  comments?: Comment[];
  favoriteChannels?: Channel[];
}
