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
	password_confirmation?: string;
};

export default function Signup() {

	const { me, login } = useAuthContext();
	const { theme } = useThemeContext();
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		const body = { user: data }
		const response = await http.post('/auth/signup', body);
		if (response.token && response.user) {
			login(response);
			return;
		} else {
			console.error(response)
		}
	};

	if (me.auth) return <Navigate to="/" />;

	return (
		<div
			className="main"
			id="signup-page"
			style={{
				...theme,
			}}
		>
			<form id="signup-form">
				<InputField
					name="f_name"
					control={control}
					label="First Name"
					defaultValue=""
				/>
				<InputField
					name="l_name"
					control={control}
					label="Last Name"
					defaultValue=""
				/>
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
				{/* <InputField
					name="password_confirmation"
					control={control}
					label="Confirm Password"
					defaultValue=""
				/> */}
				<Button onClick={handleSubmit(onSubmit)}>Sign Up</Button>
			</form>
		</div>
	);
}
