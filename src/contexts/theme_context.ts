import { createContext, CSSProperties, useContext } from 'react';

interface Themes {
	light: CSSProperties;
	dark: CSSProperties;
	layoutLight: CSSProperties;
	layoutDark: CSSProperties;
}

export const themes: Themes = {
	light: {
		backgroundColor: 'var(--clrLightBg)',
		color: 'var(--clrLightText)',
	},
	dark: {
		backgroundColor: 'var(--clrDarkBg)',
		color: 'var(--clrDarkText)',
	},
	layoutLight: {
		backgroundColor: 'var(--clrLightBehind)',
		color: 'var(--clrLightText)',
	},
	layoutDark: {
		backgroundColor: 'var(--clrDarkBehind)',
		color: 'var(--clrDarkText)',
	},
};

interface InitialContextValue {
	isLight: Boolean;
	toggleTheme: Function;
	theme: CSSProperties;
	layoutTheme: CSSProperties;
}

export const ThemeContext = createContext<InitialContextValue>({
	isLight: true,
	theme: themes.light,
	layoutTheme: themes.layoutLight,
	toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);
