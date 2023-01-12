import './styles.scss';
import { useMemo, useContext, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OutingsContext, useOutingsContext } from '../../contexts/outings_context';

// icons
import { CurrencyYen, Favorite, Star } from '@mui/icons-material';
import PageLayout from '../../components/page_layout/page_layout';
import { IconButton } from '@mui/material';

export default function OutingsShow() {
	const params: any = useParams();
  const { outing, updateOuting } = useOutingsContext();

	const toggleFavorite = useCallback(async () => {
    if (!outing) return;

    const thisId = parseInt(params.outingId, 10);
    updateOuting(thisId, { is_favorite: !is_favorite });
	}, [updateOuting, params, outing]);

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
		images,
    is_favorite
	} = outing;


  // TODO: This page has its own header and stuff?
  return (
    <PageLayout id="Outing">
      <header className="outing-header">
        <IconButton onClick={toggleFavorite} >
          {is_favorite ? (
            <Favorite style={{ color: 'gold' }} />
          ) : (
            <Favorite style={{ color: 'grey' }} />
        )}
        </IconButton>

        <h3>{title}</h3>
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
        {images && <img src={images} alt="" />}
      </main>
    </PageLayout>
  );
}
