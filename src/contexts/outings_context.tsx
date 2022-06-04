import { createContext, useContext, } from 'react';
import { Outing } from '../data/outings';

type GlobalOutings = {
	outings: Outing[];
	getOuting: Function;
	updateOuting: Function;
	doSearch: Function;
	clearSearch: Function;
};

export const OutingsContext = createContext<GlobalOutings>({
	outings: [],
	getOuting: () => {},
	updateOuting: () => {},
	doSearch: () => {},
	clearSearch: () => {},
});

export const useOutingsContext = () => useContext(OutingsContext);
