import { DarkMode, LightMode } from '@mui/icons-material';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme_context';

function ThemeButton() {
	const { isLight, theme, toggleTheme } = useContext(ThemeContext);

	return (
		<button
			className="theme-button"
			onClick={() => toggleTheme()}
			style={{
				backgroundColor: isLight ? 'lightgrey' : 'grey',
				marginRight: '2rem',
			}}
		>
			<div
				style={{
					marginLeft: isLight ? '0rem' : '2rem',
					marginRight: isLight ? '2rem' : '0rem',
					...theme,
				}}
			>
				{isLight ? <LightMode /> : <DarkMode />}
			</div>
		</button>
	);
}

export default ThemeButton;
