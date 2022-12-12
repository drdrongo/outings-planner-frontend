import { createContext, useContext, } from 'react';
import { IOuting } from '../data/outings';

type GlobalOutings = {
	outings: IOuting[];
	outing?: IOuting;
	doSearch: Function;
	clearSearch: Function;
	paginate: Function;
	updateOuting: Function;
	setOutingId: Function;
};

export const OutingsContext = createContext<GlobalOutings>({
	outings: [],
	outing: undefined,
	doSearch:  () => {},
	clearSearch: () => {},
	paginate: () => {},
	updateOuting: () => {},
	setOutingId: () => {},
});

export const useOutingsContext = () => useContext(OutingsContext);
