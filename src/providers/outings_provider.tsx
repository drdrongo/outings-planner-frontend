import { useState, useEffect, useReducer } from 'react';
import { OutingsContext } from '../contexts/outings_context';
import http from '../data/http';
import { Outing } from '../data/outings';

type Props = {
  children?: React.ReactNode;
};

const OutingsProvider = ({ children }: Props) => {
	const [outings, setOutings] = useState<Array<Outing>>([]);

	function reducer(state: any, action: any) {
		switch(action.type) {
			case 'clear':
				return {};
			case 'filter':
				return {
					...state,
					...action.payload
				}
			default:
				return state;
		};
	}
	
	const [searchState, searchDispatch] = useReducer(reducer, {})

	const doSearch = (field: string, val: any) => {
    searchDispatch({ type: 'filter', payload: { [field]: val } });
  };

	const clearSearch = () => {
    searchDispatch({ type: 'clear' });
  };



	const fetchOutings: Function = async (params: any = {}) => {
		const outings: Outing[] = await http.get('/api/v1/outings', params);
		return outings;
	};

	function getOuting(id: number): Outing | undefined {
		return outings.find(outings => outings.id === id);
	}

	function updateOuting(id: number, params: object): boolean {
		const thisOuting = outings.find(outings => outings.id === id);
		if (!thisOuting) {
			console.error('No outing found (updateOuting)');
			return false;
		}

		Object.keys(params).forEach(
			key =>
				(thisOuting[key as keyof object] = params[key as keyof object])
		);
		setOutings([...outings]);
		return true;
	}

	useEffect(() => {
		fetchOutings(searchState).then((response: Outing[]) => setOutings(response));
	}, [searchState]);

	return (
		<OutingsContext.Provider value={{ outings, getOuting, updateOuting, doSearch, clearSearch }}>
			{children}
		</OutingsContext.Provider>
	);
};

export default OutingsProvider;