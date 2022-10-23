import { createContext, useContext, } from 'react';
import { IOuting } from '../data/outings';

type GlobalOutings = {
	outings: IOuting[];
	outing?: IOuting;
	doSearch: Function;
	clearSearch: Function;
	paginate: Function;
	updateOuting: Function;
};

export const OutingsContext = createContext<GlobalOutings>({
	outings: [],
	outing: undefined,
	doSearch:  () => {},
	clearSearch: () => {},
	paginate: () => {},
	updateOuting: () => {},
});

export const useOutingsContext = () => useContext(OutingsContext);
