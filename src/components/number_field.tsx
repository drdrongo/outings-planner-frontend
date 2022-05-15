import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface NumberFieldProps {
	name: string;
	control: FormData | any;
	rules?: object | undefined;
	label: string;
	defaultValue: any | undefined;
	autoComplete?: string | undefined;
}
const NumberField = ({
	name,
	control,
	rules = {},
	label,
	defaultValue = '',
	autoComplete = '',
}: NumberFieldProps) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<TextField
					label={label}
					variant="filled"
					value={value}
					onChange={onChange}
					type="number"
					error={!!error}
					helperText={error ? error.message : null}
					autoComplete={autoComplete}
					inputProps={{
						autoComplete: autoComplete,
						form: {
							autoComplete: 'off', // Stops field auto-fill for this form??
						},
						inputMode: 'numeric',
						pattern: '[0-9]*',
					}}
				/>
			)}
		/>
	);
};

export default NumberField;
