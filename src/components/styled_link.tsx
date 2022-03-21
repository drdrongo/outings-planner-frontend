import React from 'react';
import { Link, To } from 'react-router-dom';
import { useThemeContext } from '../contexts/theme_context';

type Props = {
	children?: React.ReactNode;
	to: To;
};

const StyledLink = ({ to, children }: Props) => {
	const { theme } = useThemeContext();

	return (
		<Link style={{ ...theme }} to={to}>
			{children}
		</Link>
	);
};

export default StyledLink;
