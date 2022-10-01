import './styles.scss';
import IconLink from '../icon_link/icon_link';
import { useThemeContext } from '../../contexts/theme_context';
import { useResponsiveContext } from '../../contexts/responsive_context';
import {
	AddCircleOutline,
	AddIcCall,
	ConnectWithoutContact,
	Home,
	People,
	Settings,
	ViewList,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { fetchMyPartner } from '../../data/couples';
import { useAuthContext } from '../../contexts/auth_context';

const Navbar = () => {
	const { me } = useAuthContext();
	const { isDesktop, isMobile } = useResponsiveContext();
	const { theme } = useThemeContext();

	if (isDesktop) {
		return (
			<div id="navbar">
				<IconLink title="Home" to="/">
					<Home />
				</IconLink>

				<IconLink title="Outings" to="/outings">
					<ViewList />
				</IconLink>

				<IconLink title="New Outing" to="/new_outing">
					<AddCircleOutline />
				</IconLink>

				<IconLink title="My Couple" to="/my_couple">
					<ConnectWithoutContact />
				</IconLink>

				<IconLink title="Settings" to="/settings">
					<Settings />
				</IconLink>

				{/* <Button onClick={() => fetchMyPartner(me.id)}>Get partner.</Button> */}
			</div>
		);
	} else {
		return (
			<div id="navbar">
				<IconLink title="My Couple" to="/my_couple">
					<ConnectWithoutContact />
				</IconLink>

				<IconLink title="Outings" to="/outings">
					<ViewList />
				</IconLink>

				<IconLink title="Home" to="/">
					<Home />
				</IconLink>

				<IconLink title="New Outing" to="/new_outing">
					<AddCircleOutline />
				</IconLink>

				<IconLink title="Settings" to="/settings">
					<Settings />
				</IconLink>

				{/* <Button onClick={() => fetchMyPartner(me.id)}>Get partner.</Button> */}
			</div>
		);
	}
};

export default Navbar;
