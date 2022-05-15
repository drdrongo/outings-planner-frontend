import http from './http';

export interface IMe {
	auth: boolean;
	id?: number;
	f_name?: string;
	l_name?: string;
	email?: string;
	image?: string;
	birthday?: number;
}

export const fetchMe: Function = async () => {
	const me: IMe = await http.get('http://localhost:3000/api/v1/auth', {
		email: 'hayatoclarke@gmail.com',
		password: 'foobar',
	});

	return me;
};
