import { useState } from 'react';
import { Button } from '@mui/material';

import { useThemeContext } from '../../contexts/theme_context';
import StyledLink from '../styled_link';
import ThemeButton from '../theme_button';
import { useForm } from 'react-hook-form';
import { saveJwt } from '../../service/jwt';
import http from '../../data/http';
import './styles.scss';
import InputField from '../input_field';
import { useAuthContext } from '../../contexts/auth_context';

type FormData = {
	f_name: string;
	l_name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

export function LoginForm() {
	const { updateMe } = useAuthContext();

	const {
		handleSubmit,
		control,
	} = useForm<FormData>();

	const onSubmit = handleSubmit(async (data) => {
		const url = '/auth/login';
		const response = await http.post(url, data)
		console.log({ response })
		if (response.token && response.token.length) {
			saveJwt(response.token);
		}
		if (response.user) {
			updateMe(response.user);
		}
	});

	return (
		<form id="login-form">
			<InputField name="email" control={control} label="Email" defaultValue="" />
			<InputField name="password" control={control} label="Password" defaultValue="" />
			<Button onClick={onSubmit}>Submit</Button>
		</form>
	);
}

const Header = () => {
	const { me } = useAuthContext();
	const { isLight, theme } = useThemeContext();
	const [formOpen, setFormOpen] = useState(false);

	return (
		<header
			className="app-header"
			style={{
				...theme,
				borderBottomWidth: '1px',
				borderBottomStyle: 'solid',
				borderBottomColor: theme.color,
			}}
		>
			<nav>
				<ThemeButton />
				{me.auth && <h3>Hello, {me.email}</h3>}
				{/* <StyledLink to="/swiper">Swiper</StyledLink> |{' '} */}
				<StyledLink to="/new_outing">New Outing</StyledLink> |{' '}
				<StyledLink to="/outings">Outings</StyledLink> ||{' '}
				<StyledLink to="/new_user">New User</StyledLink> |{' '}
				<StyledLink to="/users">Users</StyledLink> ||{' '}
				<StyledLink to="/new_couple">New Couple</StyledLink> |{' '}
				<StyledLink to="/couples">Couples</StyledLink> ||{' '}
				{!me.auth && <Button style={{ marginLeft: 'auto' }} onClick={() => setFormOpen(!formOpen)}>Log in</Button>}
			</nav>

			{formOpen && <LoginForm />}
		</header>
	);
};

export default Header;
