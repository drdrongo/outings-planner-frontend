interface Outing {
  id: number;
  title: string;
  description: string;
  price: number;
  mood: number;
  category: number;
  images?: string;
  // rating: number;
  // plannedTime: Date;
  // images: string;
  // isComplete: boolean;
  // isFavorite: boolean;
}

export let outings: Outing[] = [
  {
    id: 1,
    title: 'Go to park',
    description: 'We want to visit the park! We talked about this last week',
    price: 1,
    mood: 2,
    category: 6
  },
  {
    id: 2,
    title: 'Go shopping in Ginza',
    description: 'We want to Go shopping in Ginza! We talked about this last week',
    price: 5,
    mood: 4,
    category: 2
  },
  {
    id: 3,
    title: 'Visit Sensouji',
    description: 'We want to Visit Sensouji! We talked about this last week',
    price: 1,
    mood: 3,
    category: 6
  },
  {
    id: 4,
    title: 'Go to top of Tokyo Tower',
    description: 'We want to Go to top of Tokyo Tower! We talked about this last week',
    price: 1,
    mood: 4,
    category: 0
  },
  {
    id: 5,
    title: 'Watch Apocalypse Now',
    description: 'We want to Watch Apocalypse Now! We talked about this last week',
    price: 1,
    mood: 2,
    category: 5
  },
];



export function getOutings(): Outing[] {
  return outings;
};

export function getOuting(id: number): Outing | undefined {
  return outings.find(
    outings => outings.id === id
  );
}

export function deleteOuting(id: number): void {
  outings = outings.filter(
    outing => outing.id !== id
  );
}