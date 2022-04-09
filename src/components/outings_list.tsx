import { Outing } from '../data/outings';
import {
	NavLink,
	useLocation,
	NavLinkProps
} from 'react-router-dom';

function QueryNavLink({ to = '', ...props }: NavLinkProps) {
	const location = useLocation();
	return <NavLink to={to + location.search} {...props}/>;
}

interface OutingItemProps {
	outing: Outing;
}

const OutingItem = ({ outing }: OutingItemProps) => {
	return (
		<QueryNavLink // lets us show that this current link is acative or inactive.
			style={({ isActive = false }) => {
				return {
					display: 'block',
					margin: '1rem 0',
					color: isActive ? 'red' : '',
				};
			}}
			to={`/outings/${outing.id}`}
			key={outing.id}
		>
			{outing.title}
		</QueryNavLink>
	);
};

interface OutingsListProps {
	outings: Outing[];
}

const OutingsList = ({ outings }: OutingsListProps) => {
	return (
		<>
			{outings.map(ot => {
				return <OutingItem outing={ot} />;
			})}
		</>
	);
};

export default OutingsList;
