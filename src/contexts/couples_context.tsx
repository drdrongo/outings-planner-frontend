import { createContext, useContext, } from 'react';
import { ICouple } from '../data/couples';
import { IUser } from '../data/users';

type GlobalCouple = {
	myCouple: ICouple;
	myPartner: IUser;
};

export const CouplesContext = createContext<GlobalCouple>({
	myCouple: {},
	myPartner: {},
});

export const useCouplesContext = () => useContext(CouplesContext);
