import { createContext, CSSProperties, useContext } from 'react';

interface Themes {
	light: CSSProperties;
	dark: CSSProperties;
}

export const themes: Themes = {
	light: {
		backgroundColor: '#A3C4F3',
		color: '#413B3A',
	},
	dark: {
		backgroundColor: '#413B3A',
		color: '#EEEEEE',
	},
};

interface InitialContextValue {
	isLight: Boolean;
	theme: CSSProperties;
	toggleTheme: Function;
}

export const ThemeContext = createContext<InitialContextValue>({
	isLight: true,
	theme: themes.light,
	toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);
