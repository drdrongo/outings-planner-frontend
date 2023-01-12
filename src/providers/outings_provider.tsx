import { useParams } from 'react-router-dom';
import useOutings from 'src/hooks/outings';
import { OutingsContext } from '../contexts/outings_context';

type Props = {
	children?: React.ReactNode;
};

const OutingsProvider = ({ children }: Props) => {
	const otContext = useOutings();

	return (
		<OutingsContext.Provider
			value={otContext}
		>
			{children}
		</OutingsContext.Provider>
	);
};

export default OutingsProvider;
