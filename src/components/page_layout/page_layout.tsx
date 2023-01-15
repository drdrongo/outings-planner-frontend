import './styles.scss';
import { useThemeContext } from '../../contexts/theme_context';

interface IProps {
	children?: React.ReactNode;
	[x:string]: any;
}

const PageLayout = ({ children, ...rest }: IProps) => {
	return (
		<div
			className="main"
			style={{ backgroundColor: 'var(--clrBase)' }}
			{...rest}
		>
			{children}
		</div>
	);
};

export default PageLayout;
