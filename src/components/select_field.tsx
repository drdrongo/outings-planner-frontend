import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

interface ISelectOpt {
	lab: string;
	val: any;
}

interface SelectFieldProps {
	id?: string | undefined;
	name: string;
	control: FormData | any;
	label: string;
	defaultValue?: any;
	options: ISelectOpt[];
}
const SelectField = ({
	id,
	name,
	control,
	label,
	options = [],
	defaultValue,
}: SelectFieldProps) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<FormControl style={{ marginTop: '1rem' }} id={id || undefined}>
					<InputLabel id={`${label}-select-label`}>{label}</InputLabel>
					<Select
						labelId={`${label}-select-label`}
						value={value}
						label={label}
						onChange={onChange}
					>
						{options.map(({ lab, val }) => (
							<MenuItem value={val}>{lab}</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		/>
	);
};

export default SelectField;
