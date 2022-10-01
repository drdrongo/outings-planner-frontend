import './styles.scss';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InputField from '../../components/input_field';
import { useAuthContext } from '../../contexts/auth_context';
import { useThemeContext } from '../../contexts/theme_context';
import http from '../../data/http';
import { Button, ButtonBase, Slider, TextField } from '@mui/material';
import { useCouplesContext } from '../../contexts/couples_context';
import PageLayout from '../../components/page_layout/page_layout';
import SelectField from '../../components/select_field';
import { Link } from 'react-router-dom';

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
	title: string;
	description: string;
	price: number;
	mood: number;
};

export default function NewOuting() {
	const { theme } = useThemeContext();
	const { myCouple } = useCouplesContext();
	const { me } = useAuthContext();

	const [newOutingId, setNewOutingId] = useState(0);

	const {
		control,
		handleSubmit,
		reset,
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
		if (response?.id) {
			setNewOutingId(response.id);
			reset();
		}
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

	const [moodVal, setMoodVal] = useState(3);
	const priceMarks = [
		{ value: 1, label: '$' },
		{ value: 2, label: '' },
		{ value: 3, label: '$$$' },
		{ value: 4, label: '' },
		{ value: 5, label: '$$$$$' },
	];
	
	const genres: { val: any; lab: string }[] | [] =
		process?.env?.REACT_APP_CATEGORIES?.split(',').map(act => ({
			key: act,
			val: act,
			lab: act,
		})) || [];


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
				<Controller
					name="description"
					control={control}
					defaultValue=""
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<TextField
							label="Description"
							variant="filled"
							value={value}
							onChange={onChange}
							error={!!error}
							multiline={true}
							helperText={error ? error.message : null}
						/>
					)}
				/>

				<Controller
					name="price"
					control={control}
					defaultValue={3}
					render={({
						field: { onChange, value },
						fieldState: { error },
					}) => (
						<>
							<label className="slider-label" style={{ marginTop: '1rem' }}>Price</label>
							<Slider
								id="price-slider"
								onChange={onChange}
								valueLabelDisplay="auto"
								step={1}
								defaultValue={3}
								marks={priceMarks}
								min={1}
								max={5}
								style={{
									maxWidth: '26rem',
									margin: '0 auto 3rem',
								}}
							/>
						</>
					)}
				/>

				<Controller
					name="mood"
					control={control}
					defaultValue={3}
					render={({
						field: { onChange, value },
						fieldState: { error },
					}) => (
						<>
							<label className="slider-label">Mood</label>
							<Slider
								id="mood-slider"
								onChange={(e: Event, value: number | number[]) => {
									onChange();
									const val = Array.isArray(value) ? value[0] : value;
									if (val !== moodVal) {
										setMoodVal(val);
										document.documentElement.style.setProperty('--mood-value', `url('..\/..\/assets\/images\/mood-face-${val}.png')`);
									}
								}}
								valueLabelDisplay="auto"
								step={1}
								defaultValue={3}
								marks
								min={1}
								max={5}
								style={{
									maxWidth: '26rem',
									margin: '0 auto',
								}}
							/>
						</>
					)}
				/>

				<SelectField
					name="genre"
					control={control}
					label="Genre"
					defaultValue={genres[3].lab}
					options={genres}
				/>

				<Button type="submit">Create Outing</Button>
			</form>

			{Boolean(newOutingId) && (
				<div>
					<Link to={`/outings/${newOutingId}`}>
						Go to outing
					</Link>
				</div>
			)}
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
