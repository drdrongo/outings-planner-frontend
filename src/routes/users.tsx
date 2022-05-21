import { Button } from '@mui/material';
import { useState } from 'react';
import { useThemeContext } from '../contexts/theme_context';
import http from '../data/http';

interface IUser {
	f_name: string;
	l_name: string;
	email: string;
}

const Users = () => {
	const { theme } = useThemeContext();
	const [userItems, setUserItems] = useState([]);

	const getUsers = async () => {
		const response = http.get('/api/v1/users');
		return response;
	};

	const handleData = async () => {
		const users = await getUsers();
		const userItems = users.map(({ f_name, l_name, email }: IUser) => {
			return (
				<div
					key={email}
					style={{
						border: '1px solid grey',
						padding: '1rem',
						margin: '0.5rem 1rem 0.5rem',
					}}
				>
					<p>First: {f_name}</p>
					<p>Last: {l_name}</p>
					<p>Email: {email}</p>
				</div>
			);
		});
		setUserItems(userItems);
	};

	return (
		<div className="main" style={{
			...theme,
		}}>
			<Button onClick={handleData}>get user data</Button>

			{Boolean(userItems.length) && userItems}
		</div>
	);
};

export default Users;
