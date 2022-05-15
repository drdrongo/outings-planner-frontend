import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../components/input_field';
import NumberField from '../../components/number_field';
import SelectField from '../../components/select_field';

import { saveJwt } from '../../service/jwt';

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
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = handleSubmit(async data => {
		// const body = JSON.stringify({
    //   friend_email: data.friend_email,
		// 	couple: me.id
		// });
		
		const body = JSON.stringify({
			friend_email: 'erica',
			user_1_id: 2,
		});

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
			body, // body data type must match "Content-Type" header
		});
		const r = await response.json(); // parses JSON response into native JavaScript objects
		console.log(r)
		return r;
	});

	return (
    <form onSubmit={onSubmit}>
      <InputField name="friend_email" control={control} label="Friend Email" defaultValue="" />
      <input type="submit" />
    </form>
	);
}
