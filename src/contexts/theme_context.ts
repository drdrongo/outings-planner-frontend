import { createContext, CSSProperties, useContext } from 'react';

interface Themes {
	light: CSSProperties;
	dark: CSSProperties;
}

export const themes: Themes = {
	light: {
		backgroundColor: '#555577',
		color: '#EEEEEE',
	},
	dark: {
		backgroundColor: '#EEEEEE',
		color: '#000000',
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
