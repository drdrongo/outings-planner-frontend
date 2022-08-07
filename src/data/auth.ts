import http from './http';
import { IUser } from './users';

export const fetchMe: Function = async () => {
	const me: IUser = await http.get('/api/v1/auth', {
		email: 'hayato@gmail.com',
		password: 'foobar',
	});

	return me;
};
