import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth_context';
import { fetchMe } from '../data/auth';

interface IMe {
	auth: boolean;
	id?: number;
	f_name?: string;
	l_name?: string;
	email?: string;
	image?: string;
	birthday?: number;
}

type Props = {
	children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
	const [me, setMe] = useState<IMe>({ auth: false });

	const updateMe = (newMe: IMe) => setMe({ ...newMe, auth: true, });

	const getMe = (email: string, password: string) => {
		fetchMe().then((response: IMe) => {
			setMe({ ...response, auth: true });
		});
	};

	return (
		<AuthContext.Provider value={{ me, getMe, updateMe }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
