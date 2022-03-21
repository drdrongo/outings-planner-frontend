import { getOutings } from './dummy_outings';

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
  return getOutings();
  
  // const outings: Outing[] = await fetch('http://localhost:3000/api/v1/outings', {
  //   headers: {
  //     mode: 'cors',
  //     "Access-Control-Allow-Origin": "*", 
  //     'Content-Type': 'application/json'
  //   },
  // }).then(resp => resp.json());

  // return outings;
};

