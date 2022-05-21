import { useState } from 'react';
import { AuthContext } from '../contexts/auth_context';
import { fetchMe } from '../data/auth';
import { destroyJwt, saveJwt } from '../service/jwt';

interface IMe {
	auth: boolean;
	id?: number;
	f_name?: string;
	l_name?: string;
	email?: string;
	image?: string;
	birthday?: number;
	created_at?: string;
	updated_at?: string;
}

interface ILoginProps {
	user: IMe;
	token: string;
}

type Props = {
	children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
	const [me, setMe] = useState<IMe>({ auth: false });
	const logout = () => {
		destroyJwt();
		setMe({ auth: false });
	}

	const login = ({
		user,
		token
	}: ILoginProps) => {
		saveJwt(token);
		setMe({ ...user, auth: true, });
	}

	const updateMe = (newMe: IMe) => setMe({ ...newMe, auth: true, });

	const getMe = () => {
		fetchMe().then((response: IMe) => {
			console.log({ response })
			setMe({ ...response, auth: true });
		});
	};

	return (
		<AuthContext.Provider value={{ me, getMe, updateMe, logout, login }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
