import { useState } from 'react';
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
  const [isLight, setIsLight] = useState(true);
	const [theme, setTheme] = useState(themes.light);

	const toggleTheme: Function = () => {
		if (theme === themes.light) {
      setIsLight(false);
			setTheme(themes.dark);
		} else {
      setIsLight(true);
			setTheme(themes.light);
		}
	};

	return (
		<MuiThemeProvider theme={muiTheme}>
		<ThemeContext.Provider
			value={{ isLight, theme, toggleTheme }}
		>
			{children}
		</ThemeContext.Provider>
		</MuiThemeProvider>
	);
};

export default ThemeProvider;
