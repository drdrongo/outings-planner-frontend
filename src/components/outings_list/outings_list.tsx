import './styles.scss';
import { IOuting } from '../../data/outings';
import { NavLink, useLocation, NavLinkProps } from 'react-router-dom';
import hiking from '../../assets/images/activities/hiking.jpeg';
import { Avatar } from '@mui/material';

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

				<h3>{outing.title}</h3>
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
						{[...Array(outing.price)].map(() => '$')}
						<div style={{
							backgroundImage: `url('../../assets/images/mood-face-${outing.mood}.png')`,
							width: '2rem',
							height: '2rem',
							backgroundSize: 'contain'
						}} />
						<span>{outing.genre}</span>
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

const OutingsList = ({ outings }: OutingsListProps) => {
	if (!outings || !Array.isArray(outings)) return null;

	return (
		<>
			{outings.map(ot => {
				return <OutingItem key={ot.id} outing={ot} />;
			})}
		</>
	);
};

export default OutingsList;
