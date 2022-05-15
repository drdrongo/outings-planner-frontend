import { useMemo, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OutingsContext } from '../contexts/outings_context';

// icons
import { Star, CurrencyYen, Favorite, FavoriteBorder } from '@mui/icons-material';
// import Star from '@mui/icons-material/Star';
// import CurrencyYen from '@mui/icons-material/CurrencyYen';
// import Favorite from '@mui/icons-material/Favorite';
// import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Outing } from '../data/outings';
import http from '../data/http';

export default function OutingsShow() {
	const { outings, getOuting, updateOuting } = useContext(OutingsContext);

	const navigate = useNavigate();

	const params: any = useParams();

	const outing: Outing | undefined = useMemo(() => {
    return getOuting(parseInt(params.outingId, 10))
  }, [getOuting, params.outingId]);

	const toggleFavorite = useCallback(async () => {
    const thisId = parseInt(params.outingId, 10);
		http.post('/api/v1/outings/toggle_favorite', { id: thisId });
    
    const outing = outings.find(out => out.id === parseInt(params.outingId, 10));
    if (!outing) {
      console.error('No existing outing in toggleFavorite');
      return;
    }

    updateOuting(thisId, { is_favorite: !outing.is_favorite})
	}, [updateOuting, params, outings]);

  const FavoriteButton = useMemo(() => {
    if (!outing) return;

    return (
      <button
          onClick={toggleFavorite}
          style={{ backgroundColor: outing.is_favorite ? 'pink' : 'blue' }}
        >
          {outing.is_favorite ? <Favorite /> : <FavoriteBorder />}
      </button>
    );
  }, [toggleFavorite, outing]);


  if (!outing) {
		return (
			<main className="outing-content" style={{ padding: '1rem' }}>
				<h2>Nothing here</h2>
			</main>
		);
	}

  const {
		title,
		mood,
		price,
		description,
		image,
	} = outing;

  return (
    <main className="outing-content" style={{ padding: '1rem' }}>
      <h2>{title}</h2>
      <p>Excitement Rating:</p>
      {[...Array(mood)].map((_star, idx) => (
        <Star key={idx} />
      ))}

      <p>Favorite:</p>
      {FavoriteButton}

      <p>Price:</p>
      {[...Array(price)].map((_yen, idx) => (
        <CurrencyYen key={idx} />
      ))}
      <p>{description}</p>
      {image && <img src={image} alt="" />}
      <p>
        <button
          onClick={() => {
            // deleteOuting(outing.id);
            navigate('/outings');
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );


}
