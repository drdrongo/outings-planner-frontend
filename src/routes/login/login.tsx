import './styles.scss';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import InputField from '../../components/input_field';
import { useThemeContext } from '../../contexts/theme_context';
import http from '../../data/http';
import { useAuthContext } from '../../contexts/auth_context';
import { Navigate } from 'react-router-dom';

type FormData = {
	f_name: string;
	l_name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

function LoginForm() {
	const { me, login } = useAuthContext();

	const { handleSubmit, control } = useForm<FormData>();

	const onSubmit = handleSubmit(async data => {
		const url = '/auth/login';
		const response = await http.post(url, data);
		console.log({ response });
		if (response.token && response.user) {
			login(response);
		}
	});

	if (me.auth) return <Navigate to="/" />;

	return (
		<form id="login-form">
			<InputField
				name="email"
				control={control}
				label="Email"
				defaultValue=""
			/>
			<InputField
				name="password"
				control={control}
				label="Password"
				defaultValue=""
			/>
			<Button onClick={onSubmit}>Submit</Button>
		</form>
	);
}

export default function Login() {
	const { theme } = useThemeContext();

	return (
		<div
			className="main"
			id="login-page"
			style={{
				...theme,
			}}
		>
			<LoginForm />
		</div>
	);
}
