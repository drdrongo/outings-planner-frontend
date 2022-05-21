import { createContext, useContext, } from 'react';
import { IMe } from '../data/auth';

type GlobalAuth = {
  me: IMe;
  getMe: Function;
  updateMe: Function;
  logout: Function;
  login: Function;
};


export const AuthContext = createContext<GlobalAuth>({
	me: { auth: false },
  getMe: () => {},
  updateMe: () => {},
  logout: () => {},
  login: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
