import { Tooltip } from '@material-ui/core';
import React from 'react';
import { Link, NavLink, To } from 'react-router-dom';
import { useThemeContext } from '../../contexts/theme_context';

type Props = {
	children?: React.ReactNode;
	to: To;
	title: string;
};

const IconLink = ({ to, children, title }: Props) => {
	// const { theme } = useThemeContext();

	return (
		<Tooltip title={title}>
			<NavLink 
			// style={{ ...theme }} 
			to={to}>
				{children}
			</NavLink>
		</Tooltip>
	);
};

export default IconLink;
