import './styles.scss';
import { IOuting } from '../../data/outings';
import { NavLink, useLocation, NavLinkProps } from 'react-router-dom';
import hiking from '../../assets/images/activities/hiking.jpeg';
import { Avatar } from '@mui/material';
import { useOutingsContext } from 'src/contexts/outings_context';
import {useRef, useCallback, useEffect} from 'react'




function QueryNavLink({ to = '', ...props }: NavLinkProps) {
	const location = useLocation();
	return (
		<NavLink className="outing-item" to={to + location.search} {...props} />
	);
}

interface OutingItemProps {
	outing: IOuting;
}

const OutingItem = ({ outing }: OutingItemProps) => {
	return (
		<QueryNavLink // lets us show that this current link is acative or inactive.
			to={`/outings/${outing.id}`}
			key={outing.id}
		>
			<div
				className="outing-image"
				style={{
					backgroundImage: outing.images
						? `url(${outing.images[0]})`
						: hiking,
				}}
			>

				<h3 style={{ color: '#FFFFFF' }}>{outing.title}</h3>
				<Avatar
					src={
						outing.user_image
							? outing.user_image
							: 'https://gravatar.com/avatar/468355c6815fe2c112e0de6724ca5c0a?s=400&d=robohash&r=x'
					}
				/>
			</div>

			<div className="outing-information">
					<div className="outing-options">
						<span>
							{[...Array(outing.price)].map(() => '$')}
						</span>
						<div style={{
							backgroundImage: `url('../../assets/images/mood-face-${outing.mood}.png')`,
							width: '2rem',
							height: '2rem',
							backgroundSize: 'contain'
						}} />
						<span
							style={{
								marginRight: 'auto'
							}}
						>{outing.genre}</span>
						<span>{outing.location}</span>
					</div>
					<p>{outing.description}</p>
			</div>
		</QueryNavLink>
	);
};

interface OutingsListProps {
	outings: IOuting[];
}

const OutingsList = () => {
	const { outings, paginate, isFetchingOutings, lastPageReached } = useOutingsContext();
  const observerElem = useRef(null)

	const handleObserver = useCallback((entries) => {
		const [target] = entries
		if(target.isIntersecting && !isFetchingOutings && !lastPageReached) {
			paginate();
		}
	}, [paginate, isFetchingOutings, lastPageReached])
	
	useEffect(() => {
		const element = observerElem.current
		if (!element) return;

		const option = { threshold: 0 }
	
		const observer = new IntersectionObserver(handleObserver, option);
		observer.observe(element)
		return () => observer.unobserve(element)
	}, [paginate, handleObserver])
	

	if (!outings || !Array.isArray(outings)) return null;

	return (
		<>
			{outings.map(ot => {
				return <OutingItem key={ot.id} outing={ot} />;
			})}

			<div className='loader' ref={observerElem}>
				{/* {isFetchingNextPage && hasNextPage ? 'Loading...' : 'No search left'} */}
			</div>

		</>
	);
};

export default OutingsList;
