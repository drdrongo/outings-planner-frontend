import { Button } from '@mui/material';

import { useThemeContext } from '../../contexts/theme_context';
import ThemeButton from '../theme_button';
import './styles.scss';
import { useAuthContext } from '../../contexts/auth_context';
import { useNavigate } from 'react-router-dom';

import OutingLogo from '../outing_logo/outing_logo';

const Header = () => {
	const { me, logout } = useAuthContext();
	const { theme } = useThemeContext();
	const navigate = useNavigate();

	return (
		<header
			id="app-header"
			style={{
				// ...theme,
				borderBottomWidth: '1px',
				borderBottomStyle: 'solid',
				borderBottomColor: theme.color,
			}}
		>

			<nav>
				{/* <CastleIcon
					style={{
						marginRight: 'auto',
						marginLeft: '1.2rem',
						fontSize: '3.2rem',
					}}
					onClick={() => navigate('/')}
				/> */}
				<OutingLogo />
				
				<ThemeButton />
				{me.auth && <h3>Hello, {me.email}</h3>}

				{me.auth ? (
					<Button onClick={() => logout()}>Log Out</Button>
				) : (
					<>
						<Button onClick={() => navigate('/signup')}>
							Sign Up
						</Button>
						<Button onClick={() => navigate('/login')}>
							Login
						</Button>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;
