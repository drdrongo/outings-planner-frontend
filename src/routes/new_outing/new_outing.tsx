import './styles.scss';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from '../../components/input_field';
import NumberField from '../../components/number_field';
// import SelectField from '../../components/select_field';
import { useAuthContext } from '../../contexts/auth_context';
import { useThemeContext } from '../../contexts/theme_context';
import http from '../../data/http';
import { Button } from '@mui/material';
import { useCouplesContext } from '../../contexts/couples_context';
import PageLayout from '../../components/page_layout/page_layout';

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
		console.log({ myCouples });
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
			<form id="new-outing-form">
				{/* <SelectField
						name="couple_id"
						control={control}
						label="Selector"
						options={selectOptions}
						defaultValue={selectOptions[0].optVal}
				/> */}
				{/* <NumberField
					name="couple_id"
					control={control}
					label="Couple ID"
					defaultValue=""
				/> */}
				<InputField
					name="title"
					control={control}
					label="Title"
					defaultValue=""
				/>
				<InputField
					name="description"
					control={control}
					label="Description"
					defaultValue=""
				/>
				<InputField
					name="price"
					control={control}
					label="Price"
					defaultValue=""
				/>
				<Button onClick={onSubmit}>Create Outing</Button>
			</form>
		</PageLayout>
	);
}
