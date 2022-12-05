import { Image } from '@mui/icons-material';
import React from 'react'
import { IOuting } from '../data/outings'


interface Props {
  outing: IOuting;
}

// id: number;
// title: string;
// description: string;
// price: number;
// mood: number;
// category: number;
// image?: string;
// genre: number;
// is_favorite: Boolean;
// is_complete: Boolean;
// rating: number;

const SwiperCard = ({ outing } : Props) => {
  const { title, id, description, images } = outing;
  return (
    <div>
      <h1>{title}</h1>
      <p>{id}</p>
      <p>{description}</p>
      {images && <img alt={title} src={images[0]}/>}
    </div>
  )
}

export default SwiperCard