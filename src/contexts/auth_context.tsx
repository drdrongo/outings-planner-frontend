import { createContext, useContext, } from 'react';
import { IUser } from '../data/users';

type GlobalAuth = {
  me: IUser;
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
