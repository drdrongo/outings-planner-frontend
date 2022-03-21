import { useForm } from 'react-hook-form';

import { saveJwt } from '../service/jwt';

// Outing type information:
// id: number;
// title: string;
// description: string;
// price: number;
// mood: number;
// category: number;
// image?: string;
// genre: number;
// is_favorite: Boolean;
// is_complete: Boolean;
// rating: number;

type FormData = {
	couple_id: number;
	title: string;
	description: string;
	price: number;
};

export default function NewOuting() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const handleLogin = async () => {
		const data = {
			email: 'hayatoclarke@gmail.com',
			password: '111111'
		};

		const url = 'http://localhost:3000/auth/login';

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

		const r = await response.json(); // parses JSON response into native JavaScript objects
		if (r?.token && r.token.length) {
			saveJwt(r.token);
			console.log('saved token all good');
		}
		return r;
	};

	const onSubmit = handleSubmit(async data => {
		const url = 'http://localhost:3000/api/v1/outings';
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
		const r = await response.json(); // parses JSON response into native JavaScript objects
		return r;
	});

	return (
		<>
			<form onSubmit={onSubmit}>
				<label htmlFor="couple_id">Outing Id (1 for testing)</label>
				<input {...register('couple_id')} />

				<input {...register('title')} />
				<input {...register('description')} />
				<input {...register('price')} />
				<input type="submit" />
			</form>



			<p>hello there fool!</p>
			<button onClick={handleLogin}>Log in?</button>
		</>
	);
}
