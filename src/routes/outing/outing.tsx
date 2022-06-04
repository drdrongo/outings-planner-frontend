import './styles.scss';
import { useMemo, useContext, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OutingsContext } from '../../contexts/outings_context';

// icons
import { CurrencyYen, Star } from '@mui/icons-material';
import { Outing } from '../../data/outings';
import http from '../../data/http';
import PageLayout from '../../components/page_layout/page_layout';
import { IconButton } from '@mui/material';

export default function OutingsShow() {
	const params: any = useParams();
  const [outing, setOuting] = useState<Outing | null>(null);
	const { outings, updateOuting } = useContext(OutingsContext);

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

  const getOuting: () => Promise<void> = useCallback(async () => {
    const o: Outing =  await http.get(`/api/v1/outings/${parseInt(params.outingId, 10)}`)
    setOuting(o);
  }, [params.outingId]);

  useEffect(() => {
    getOuting(); // todo: change to use usequery instead.
  }, [getOuting]);

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


  console.log(outing)
  // TODO: This page has its own header and stuff?
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
