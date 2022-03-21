import { createContext, useContext, } from 'react';
import { Outing } from '../data/outings';

type GlobalOutings = {
	outings: Outing[];
	getOuting: Function;
	updateOuting: Function;
};

export const OutingsContext = createContext<GlobalOutings>({
	outings: [],
	getOuting: () => {},
	updateOuting: () => {},
});

export const useOutingsContext = () => useContext(OutingsContext);
