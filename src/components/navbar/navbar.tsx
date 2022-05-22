import './styles.scss';
import IconLink from '../icon_link/icon_link';
import { useThemeContext } from '../../contexts/theme_context';
import { useResponsiveContext } from '../../contexts/responsive_context';
import { AddCircleOutline, AddIcCall, ConnectWithoutContact, Home, People, ViewList } from '@mui/icons-material';
import { Button } from '@mui/material';
import { fetchMyPartner } from '../../data/couples';
import { useAuthContext } from '../../contexts/auth_context';

const Navbar = () => {
	const { me } = useAuthContext();
	const { isDesktop } = useResponsiveContext();
  const { theme } = useThemeContext();

  return (
    <div id="navbar" style={theme}>
				<IconLink title="Home" to="/">
					<Home />
				</IconLink>
				<IconLink title="Outings" to="/outings">
					<ViewList />
				</IconLink>
				<IconLink title="New Outing" to="/new_outing">
					<AddCircleOutline />
				</IconLink>

				{isDesktop && <IconLink title="Users" to="/users">
					<People />
				</IconLink>}

				<IconLink title="New Couple" to="/new_couple">
					<AddIcCall />
				</IconLink>
				<IconLink title="My Couple" to="/my_couple">
					<ConnectWithoutContact />
				</IconLink>

				<Button onClick={() => fetchMyPartner(me.id)}>Get partner.</Button>
    </div>
  )
}

export default Navbar;