import { createContext, useContext, } from 'react';
import { IMe } from '../data/auth';

type GlobalAuth = {
  me: IMe;
  getMe: Function;
  updateMe: Function;
};


export const AuthContext = createContext<GlobalAuth>({
	me: { auth: false },
  getMe: () => {},
  updateMe: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
