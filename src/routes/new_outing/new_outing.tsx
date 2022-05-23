import './styles.scss';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../components/input_field';
import NumberField from '../../components/numberfield/number_field';
// import SelectField from '../../components/select_field';
import { useAuthContext } from '../../contexts/auth_context';
import { useThemeContext } from '../../contexts/theme_context';
import http from '../../data/http';
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import { useCouplesContext } from '../../contexts/couples_context';
import PageLayout from '../../components/page_layout/page_layout';
import SelectField from '../../components/select_field';

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
	// couple_id: number;
	title: string;
	description: string;
	price: number;
};

export default function NewOuting() {
	const { theme } = useThemeContext();
	const { myCouple } = useCouplesContext();

	const { me } = useAuthContext();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = handleSubmit(async data => {
		const body = {
			outing: {
				...data,
				couple_id: myCouple.id,
			},
		};
		const response = await http.post('/api/v1/outings', body);
		console.log({ responseFromNewOuting: response });
		return response;
	});

	const [couples, setCouples] = useState([]);

	const fetchCouples = useCallback(async () => {
		if (!me.id) return;

		const myCouples = await http.get('/api/v1/couples', {
			user_id: +me.id,
		});
		setCouples(myCouples);
	}, [me.id]);

	useEffect(() => {
		fetchCouples();
	}, [fetchCouples]);

	const selectOptions: { optVal: any; optLab: string }[] = [
		{ optVal: 1, optLab: 'One' },
		{ optVal: 2, optLab: 'Two' },
		{ optVal: 3, optLab: 'Three' },
	];

	if (!myCouple.id) return <PageLayout></PageLayout>;

	return (
		<PageLayout id="new-outing-page">
			<form id="new-outing-form" onSubmit={onSubmit}>
				<InputField
					name="title"
					control={control}
					label="Title"
					defaultValue=""
					rules={{ required: 'Required' }}
				/>
				<InputField
					name="description"
					control={control}
					label="Description"
					defaultValue=""
					rules={{ required: 'Required' }}
				/>

				<NumberField
					name="price"
					control={control}
					label="Price"
					defaultValue={0}
				/>

				<NumberField
					name="mood"
					control={control}
					label="Mood"
					defaultValue={0}
				/>

				<SelectField
					name="genre"
					control={control}
					label="Genre"
					defaultValue=""
					options={[
						{ lab: 'Genre', val: '' },
						{ lab: 'Fun', val: 'fun' },
						{ lab: 'Sad', val: 'sad' },
						{ lab: 'Gum', val: 'gum' }
					]}
				/>


				<Button type="submit">Create Outing</Button>
			</form>
		</PageLayout>
	);
}


// attend_on: null
// couple_id: 4
// created_at: "2022-05-23T15:25:14.750Z"
// description: "asdf"
// genre: 0
// id: 6
// images: []
// is_complete: false
// is_favorite: false
// mood: 0
// price: 3
// rating: 0
// spot_id: null
// title: "abcd"
// updated_at: "2022-05-23T15:25:14.750Z"
