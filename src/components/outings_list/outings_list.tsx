import './styles.scss';
import { Outing } from '../../data/outings';
import {
	NavLink,
	useLocation,
	NavLinkProps
} from 'react-router-dom';

function QueryNavLink({ to = '', ...props }: NavLinkProps) {
	const location = useLocation();
	return <NavLink className="outing-item" to={to + location.search} {...props}/>;
}

interface OutingItemProps {
	outing: Outing;
}

const OutingItem = ({ outing }: OutingItemProps) => {
	return (
		<QueryNavLink // lets us show that this current link is acative or inactive.
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
	console.log({isArray: Array.isArray(outings)})
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
