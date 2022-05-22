import http from './http';
import { IUser } from './users';

export const fetchMe: Function = async () => {
	const me: IUser = await http.get('http://localhost:3000/api/v1/auth', {
		email: 'hayatoclarke@gmail.com',
		password: 'foobar',
	});

	return me;
};
