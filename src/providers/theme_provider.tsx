import { useEffect, useState } from 'react';
import { themes, ThemeContext } from '../contexts/theme_context';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';



type Props = {
  children?: React.ReactNode;
};

const muiTheme = createTheme({
  typography: {
    // In Japanese the characters are usually larger.
    fontSize: 22,
  },
});


export const ThemeProvider = ({ children }: Props) => {
  const [isLight, setIsLight] = useState(localStorage.getItem('clrTheme') === 'light');
	const [theme, setTheme] = useState(isLight ? themes.light : themes.dark);
	const [layoutTheme, setLayoutTheme] = useState(isLight ? themes.layoutLight : themes.layoutDark);

	const setRootColors = (newTheme: string) => {
		const newTxtClr = newTheme === 'dark' ? 'var(--clrDark)' : 'var(--clrLight)';
		const newBgClr = newTheme === 'dark' ? 'var(--clrLight)' : 'var(--clrDark)';
		document.documentElement.style.setProperty('--clrSecondary', newTxtClr);
		document.documentElement.style.setProperty('--clrTertiary', newBgClr);
	}

	const toggleTheme: Function = () => {
		const newTheme = theme === themes.light ? 'dark' : 'light';

		if (newTheme === 'dark') {
      setIsLight(false);
			setTheme(themes.dark);
			setLayoutTheme(themes.layoutDark);
		} else {
      setIsLight(true);
			setTheme(themes.light);
			setLayoutTheme(themes.layoutLight);
		}
		setRootColors(newTheme);
		localStorage.setItem('clrTheme', newTheme)
	};

	useEffect(() => {
		if (isLight) {
			setRootColors('light');
		} else {
			setRootColors('dark');
		}
	}, []);

	return (
		<MuiThemeProvider theme={muiTheme}>
		<ThemeContext.Provider
			value={{ isLight, theme, toggleTheme, layoutTheme }}
		>
			{children}
		</ThemeContext.Provider>
		</MuiThemeProvider>
	);
};

export default ThemeProvider;
