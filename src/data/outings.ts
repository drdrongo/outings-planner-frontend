import { getOutings } from './dummy_outings';
import http from './http';

export interface Outing {
  id: number;
  title: string;
  description: string;
  price: number;
  mood: number;
  category: number;
  image?: string;
  genre: number;
  is_favorite: Boolean;
  is_complete: Boolean;
  rating: number;
}

export const fetchOutings: Function = async () => {
  const outings: Outing[] = await http.get('/api/v1/outings');
  return outings;
};

