import './styles.scss';
import IconLink from '../icon_link/icon_link';
import { useThemeContext } from '../../contexts/theme_context';
import { useResponsiveContext } from '../../contexts/responsive_context';
import { AddCircleOutline, AddIcCall, ConnectWithoutContact, Home, People, ViewList } from '@mui/icons-material';

const Navbar = () => {
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
				<IconLink title="Couples" to="/couples">
					<ConnectWithoutContact />
				</IconLink>
    </div>
  )
}

export default Navbar;