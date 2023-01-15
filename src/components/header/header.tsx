import { Button } from '@mui/material';

import { useThemeContext } from '../../contexts/theme_context';
import ThemeButton from '../theme_button';
import './styles.scss';
import { useAuthContext } from '../../contexts/auth_context';
import { useNavigate } from 'react-router-dom';

import OutingLogo from '../outing_logo/outing_logo';

const Header = () => {
	const { me, logout } = useAuthContext();
	const { theme, isLight } = useThemeContext();
	const navigate = useNavigate();

	return (
		<header
			id="app-header"
			style={{
				// ...theme,
				borderBottomWidth: '1px',
				borderBottomStyle: 'solid',
				borderBottomColor: theme.color,
				// backgroundColor: theme.backgroundColor
			}}
		>

				<OutingLogo />
				
				{me.auth && <h3>Hello, {me.f_name}</h3>}

				<ThemeButton />

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
		</header>
	);
};

export default Header;
