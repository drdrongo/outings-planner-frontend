import './styles.scss';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import InputField from '../../components/input_field';

type FormData = {
	f_name: string;
	l_name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

export default function NewUser() {
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<FormData>();

	const onSubmit = async (data : FormData) => {
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
	};

	return (
		<form className="new-user-form">
			<InputField name="f_name" control={control} label="First Name" defaultValue="" />
			<InputField name="l_name" control={control} label="Last Name" defaultValue="" />
			<InputField name="email" control={control} label="Email" defaultValue="" />
			<InputField name="password" control={control} label="Password" defaultValue="" />
			<InputField name="password_confirmation" control={control} label="Confirm Password" defaultValue="" />
			<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
		</form>
	);
}
