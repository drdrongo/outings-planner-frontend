import './styles.scss';
import { Slider, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface NumberFieldProps {
	id?: string | undefined;
	name: string;
	control: FormData | any;
	rules?: object | undefined;
	label: string;
	defaultValue: any | undefined;
	autoComplete?: string | undefined;
	handleChange?: Function | undefined;
}
const NumberField = ({
	id,
	name,
	control,
	rules = {},
	label,
	defaultValue = 0,
	handleChange,
}: NumberFieldProps) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<>
					{label.length > 0 && <label className="slider-label">{label}</label>}
					<Slider
						id={id || undefined}
						onChange={e => {
							onChange(e);
							handleChange && handleChange(e);
						}}
						defaultValue={defaultValue}
						valueLabelDisplay="auto"
						step={1}
						marks
						min={1}
						max={5}
						style={{
							maxWidth: '26rem',
							margin: '0 auto'
						}}
					/>
				</>
			)}
		/>
	);
};

export default NumberField;
