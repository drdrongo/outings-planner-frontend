import { useParams } from 'react-router-dom';
import useOutings from 'src/hooks/outings';
import { OutingsContext } from '../contexts/outings_context';

type Props = {
	children?: React.ReactNode;
};

const OutingsProvider = ({ children }: Props) => {
	const { outings, outing, doSearch, clearSearch, paginate, updateOuting, } = useOutings();

	return (
		<OutingsContext.Provider
			value={{ outings, outing, doSearch, clearSearch, paginate, updateOuting }}
		>
			{children}
		</OutingsContext.Provider>
	);
};

export default OutingsProvider;
