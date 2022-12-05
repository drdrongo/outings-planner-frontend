import http from './http';
import { IUser } from './users';

export interface IOuting {
  id: number;
  title: string;
  description: string;
  price: number;
  mood: number;
  category: number;
  images?: string;
  genre: number;
  is_favorite: Boolean;
  is_complete: Boolean;
  rating: number;
  user_image: string;
  user_f_name: string;
  user_id: number;
  location: string;
}


// export interface IOuting extends IOuting {
//   user_image: string;
//   user_f_name: string;
//   user_id: number;
// }


export interface OutingCreateParams {
  title: string;
  description: string;
  price: number;
  mood: number;
  category: number;
  images?: string;
  genre: number;
}

export interface IOutingUpdParams {
  id: number;
  title?: string;
  description?: string;
  price?: number;
  mood?: number;
  category?: number;
  images?: string;
  genre: number;
  is_favorite?: Boolean;
  is_complete?: Boolean;
  rating?: number;
}

interface IOutingClass {
  fetchOutings: Function;
  fetchOuting: Function;
}

class Outing {
  // ----- Fetch multiple ------
  static fetchOutings: Function = async (params: object) => {
    // TODO: we need search params here.
    const { data, errors }: {
      data?: IOuting[];
      errors?: any;
    } = await http.get('/api/v1/outings', params);
    console.log({ data })
    if (data) {
      return data;
    } else {
      console.error(errors);
      return [];
    }
  };
  
  // ----- Fetch single ------
  static fetchOuting: Function = async (id: number) => {
    const { data, errors }: {
      data?: IOuting;
      errors?: any;
    } = await http.get(`/api/v1/outings/${id}`);
    
    if (data) {
      return data;
    } else {
      console.error(errors);
      return undefined;
    }
  };
  
  // ----- Create ------
  static createOuting: Function = async (params: OutingCreateParams) => {
    const { data, errors }: {
      data?: IOuting;
      errors?: any;
    } = await http.post('/api/v1/outings', params);
    
    if (data) {
      return data;
    } else {
      console.error(errors);
      return undefined;
    }
  };
  
  // ----- Update ------
  
  static updateOuting: Function = async (id: number, params: IOutingUpdParams) => {
    if (!id)
      return undefined;
  
    const { data, errors }: {
      data?: IOuting;
      errors?: any;
    } = await http.update('/api/v1/outings', params);
    
    if (data) {
      return data;
    } else {
      console.error(errors);
      return undefined;
    }
  };
}

export default Outing;