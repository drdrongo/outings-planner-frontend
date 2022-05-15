import { MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

interface ISelectOpt {
  optLab: string;
  optVal: any;
}

interface SelectFieldProps {
	name: string;
	control: FormData | any;
	label: string;
	defaultValue?: any;
  options: ISelectOpt[];
}
const SelectField = ({
	name,
	control,
	label,
  options=[],
  defaultValue
}: SelectFieldProps) => {
	return (
		<Controller
			name={name}
      defaultValue={defaultValue}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error } }) => (
				<Select value={value} label={label} onChange={onChange}>
          {options.map(({ optVal, optLab }) => <MenuItem value={optVal}>{optLab}</MenuItem>)}
				</Select>
			)}
		/>
	);
};

export default SelectField;
