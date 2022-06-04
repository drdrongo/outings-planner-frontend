import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/auth_context';
import { fetchMe } from '../data/auth';
import { IUser } from '../data/users';
import { destroyJwt, saveJwt } from '../service/jwt';


interface ILoginProps {
	user: IUser;
	token: string;
}

type Props = {
	children?: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
	const navigate = useNavigate();
	const [me, setMe] = useState<IUser>({ auth: false });
	const logout = () => {
		destroyJwt();
		setMe({ auth: false });
		navigate('/login');
	}

	const login = ({ user, token }: ILoginProps) => {
		saveJwt(token);
		setMe({ ...user, auth: true, });
	}

	const updateMe = (newMe: IUser) => setMe({ ...newMe, auth: true, });

	const getMe = () => {
		fetchMe().then((response: IUser) => {
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
