import './styles.scss';
import { useMemo, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OutingsContext } from '../../contexts/outings_context';

// icons
import { CurrencyYen, Star, StarBorder } from '@mui/icons-material';
import { Outing } from '../../data/outings';
import http from '../../data/http';
import PageLayout from '../../components/page_layout/page_layout';
import { Button, IconButton } from '@mui/material';

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
      <IconButton onClick={toggleFavorite} >
        {outing.is_favorite ? <Star style={{ color: 'gold' }} /> : <Star style={{ color: 'grey' }} />}
      </IconButton>
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
    genre,
		description,
		image,
	} = outing;

  return (
    <PageLayout id="Outing">
      <header className="outing-header">
        <h3>{title}</h3>
        <IconButton onClick={toggleFavorite} >
          {outing.is_favorite ? (
            <Star style={{ color: 'gold' }} />
          ) : (
            <Star style={{ color: 'grey' }} />
        )}
        </IconButton>
      </header>
      <main>

        <p>Excitement Rating:</p>
        {[...Array(mood)].map((_star, idx) => (
          <Star key={idx} />
        ))}

        
        
        <p>Price:</p>
        {[...Array(price)].map((_yen, idx) => (
          <CurrencyYen key={idx} />
        ))}

        <p>Genre:</p>
        <p>{genre}</p>
        



        <p>{description}</p>

        {image && <img src={image} alt="" />}
      </main>
    </PageLayout>
  );
}
