import { useForm } from 'react-hook-form';
import InputField from '../../components/input_field';
import { useAuthContext } from '../../contexts/auth_context';
import { useThemeContext } from '../../contexts/theme_context';
import http from '../../data/http';

type FormData = {
	friend_email: string;
};

export default function NewCouple() {
	const { me } = useAuthContext();
	const { theme } = useThemeContext();

	const {
		control,
		handleSubmit,
	} = useForm<FormData>();

	const onSubmit = handleSubmit(async data => {
		if (!me.id) return;

		const response = await http.post('/api/v1/couples', {
			friend_email: data.friend_email,
			user1_id: +me.id,
		})
		console.log({ response })
		return response;
	});

	return (
		<div className="main" style={{
			...theme,
		}}>
			<form onSubmit={onSubmit}>
				<InputField name="friend_email" control={control} label="Friend Email" defaultValue="" />
				<input type="submit" />
			</form>
		</div>
	);
}
