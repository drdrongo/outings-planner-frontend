import './styles.scss';
import { useMemo, useContext, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OutingsContext, useOutingsContext } from '../../contexts/outings_context';

// icons
import { CurrencyYen, Star } from '@mui/icons-material';
import PageLayout from '../../components/page_layout/page_layout';
import { IconButton } from '@mui/material';

export default function OutingsShow() {
	const params: any = useParams();
  console.log({ params })
  const { outing, updateOuting } = useOutingsContext();

  console.log({ outing })
	const toggleFavorite = useCallback(async () => {
    if (!outing) return;

    const thisId = parseInt(params.outingId, 10);
    updateOuting(thisId, { is_favorite: !outing.is_favorite });
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
		image,
	} = outing;


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
