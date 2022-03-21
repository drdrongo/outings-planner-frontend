import { useForm } from 'react-hook-form';

type FormData = {
  f_name: string;
  l_name: string;
  email: string;
  password: string;
	password_confirmation: string;
};

export default function NewUser() {
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
		<form onSubmit={onSubmit}>
      <label htmlFor="f_name">First Name</label>
			<input {...register('f_name')} />

      <label htmlFor="l_name">Last Name</label>
			<input {...register('l_name')} />

      <label htmlFor="email">Email</label>
			<input {...register('email')} />

      <label htmlFor="password">Password</label>
			<input {...register('password')} />

			<label htmlFor="password_confirmation">Password Confirmation</label>
			<input {...register('password_confirmation')} />

			<input type="submit" />
		</form>
	);
}
