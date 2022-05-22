import './styles.scss';
import { useThemeContext } from '../../contexts/theme_context';

interface IProps {
	children?: React.ReactNode;
	// rest?: any;
	[x:string]: any;
}

const PageLayout = ({ children, rest={} }: IProps) => {
	const { theme } = useThemeContext();

	return (
		<div
			className={`main ${rest.classes ? rest.classes : ''}`}
			style={{
				...theme,
				...rest.style,
			}}
			{...rest}
		>
			{children}
		</div>
	);
};

export default PageLayout;
