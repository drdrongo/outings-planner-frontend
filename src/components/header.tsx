import { useState } from 'react';
import { Button } from '@mui/material';

import { useThemeContext } from '../contexts/theme_context';
import StyledLink from './styled_link';
import ThemeButton from './theme_button';
import { useForm } from 'react-hook-form';
import { saveJwt } from '../service/jwt';

type FormData = {
  f_name: string;
  l_name: string;
  email: string;
  password: string;
	password_confirmation: string;
};

export function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = handleSubmit(async data => {
		console.log({ data });
		const url = 'http://localhost:3000/api/v1/users';
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data), // body data type must match "Content-Type" header
		});
		const r = response.json(); // parses JSON response into native JavaScript objects
		console.log({ r });
		return r;
	});

	return (
		<form style={{ position: 'fixed', inset: 0, backgroundColor: 'grey', display: 'flex', flexDirection: 'column', width: '200px', }}onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
			<input {...register('email')} />
      <label htmlFor="password">Password</label>
			<input {...register('password')} />
			<input type="submit" />
		</form>
	);
}








const Header = () => {
	const { isLight, theme } = useThemeContext();
	const [formOpen, setFormOpen] = useState(false);

	return (
		<header className="app-header" style={{ ...theme, borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: theme.color }}>
			<nav>
				<ThemeButton />
				<StyledLink to="/outings">Outings</StyledLink> |{' '}
				<StyledLink to="/expenses">Expenses</StyledLink> |{' '}
				<StyledLink to="/swiper">Swiper</StyledLink> |{' '}
				<StyledLink to="/new_outing">New Outing</StyledLink> |{' '}
				<StyledLink to="/new_user">New User</StyledLink>
				<StyledLink to="/users">Users</StyledLink>
				<Button onClick={() => setFormOpen(!formOpen)}>Log in</Button>
			</nav>

			{formOpen && <LoginForm/>}
		</header>
	);
};

export default Header;
