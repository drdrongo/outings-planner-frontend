import { createContext, useContext, } from 'react';
import { IMe } from '../data/auth';

type GlobalAuth = {
  me: IMe;
  getMe: Function;
};


export const AuthContext = createContext<GlobalAuth>({
	me: { auth: false },
  getMe: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
