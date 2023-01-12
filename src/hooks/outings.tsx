import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Outing, { IOuting, IOutingUpdParams } from 'src/data/outings';

function reducer(state: any, action: any) {
	switch (action.type) {
		case 'clear':
			return {
				page: 1,
			};
		case 'filter':
			return {
				...state,
				...action.payload,
				page: 1,
			};

		case 'paginate':
			return {
				...state,
				page: state.page + 1,
			};
		default:
			return state;
	}
}

const useOutings = () => {
	const [outingId, setOutingId] = useState();
	const [outing, setOuting] = useState<IOuting>();
	const [outings, setOutings] = useState<IOuting[]>([]);
	const [isFetchingOutings, setIsFetchingOutings] = useState(false);
	const [lastPageReached, setLastPageReached] = useState(false);

	const [searchState, searchDispatch] = useReducer(reducer, { page: 1 });
	const updateOuting = async (id: number, params: IOutingUpdParams) => {
		const res: IOuting | undefined = await Outing.updateOuting(id, params);
		if (res) {
			setOuting(prev => {
				if (!prev) return prev;

				return { ...Object.assign(prev, res) };
			});

			const ot = outings.find((ot: IOuting) => ot.id === id);
			if (!ot) return;

			Object.keys(res).forEach(key => (ot[key as keyof object] = res[key as keyof object]));
			setOutings([...outings]);
			return res;
		}
	};

	const doSearch = (field: string, val: any) => {
		searchDispatch({ type: 'filter', payload: { [field]: val } });
	};

	const clearSearch = () => {
		searchDispatch({ type: 'clear' });
	};

	const paginate = () => {
		console.log('paginating!')
		if (lastPageReached) return;

		searchDispatch({ type: 'paginate' });
	};

	const getOutings = useCallback(async () => {
		if (lastPageReached) return;

		setIsFetchingOutings(true);
		const { data, is_last_page } = await Outing.fetchOutings(searchState);
		console.log({ data })
		setIsFetchingOutings(false);

		if (is_last_page) {
			setLastPageReached(true);
		}
		if (data) setOutings((prev) => [ ...prev, ...data ]);
	}, [searchState, lastPageReached]);

	const getOuting = useCallback(async () => {
		const res = await Outing.fetchOuting(outingId);
		console.log({ resto: res });
		if (res) setOuting(res);
	}, [outingId]);

	useEffect(() => {
		if (outingId) {
			getOuting();
		} else {
			setOuting(undefined);
		}
	}, [getOuting, outingId]);

	useEffect(() => {
		// getOutings();
	}, [getOutings]);

	return { outings, outing, setOutingId, doSearch, clearSearch, paginate, updateOuting, isFetchingOutings };
};

export default useOutings;
