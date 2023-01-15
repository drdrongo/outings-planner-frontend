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
	isFetchingOutings: Boolean;
	lastPageReached: Boolean;
};

export const OutingsContext = createContext<GlobalOutings>({
	outings: [],
	outing: undefined,
	doSearch:  () => {},
	clearSearch: () => {},
	paginate: () => {},
	updateOuting: () => {},
	setOutingId: () => {},
	isFetchingOutings: false,
	lastPageReached: false,
});

export const useOutingsContext = () => useContext(OutingsContext);
