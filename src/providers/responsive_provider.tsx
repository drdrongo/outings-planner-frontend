import { useMediaQuery } from 'react-responsive';
import { ResponsiveContext } from '../contexts/responsive_context';

type Props = {
	children?: React.ReactNode;
};

const ResponsiveProvider = ({ children }: Props) => {
	const isMobile = useMediaQuery({ maxWidth: 767 });

	const isDesktop = useMediaQuery({ minWidth: 768 });

	return (
		<ResponsiveContext.Provider value={{ isMobile, isDesktop }}>
			{children}
		</ResponsiveContext.Provider>
	);
};

export default ResponsiveProvider;
