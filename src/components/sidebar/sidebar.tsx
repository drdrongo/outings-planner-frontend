import './styles.scss';
import StyledLink from '../styled_link';
import { useThemeContext } from '../../contexts/theme_context';

const Sidebar = () => {
  const { theme } = useThemeContext();

  return (
    <div id="sidebar" style={theme}>
				<StyledLink to="/">Home</StyledLink>
				<StyledLink to="/new_outing">New Outing</StyledLink>
				<StyledLink to="/outings">Outings</StyledLink>
				<StyledLink to="/new_user">New User</StyledLink>
				<StyledLink to="/users">Users</StyledLink>
				<StyledLink to="/new_couple">New Couple</StyledLink>
				<StyledLink to="/couples">Couples</StyledLink>
    </div>
  )
}

export default Sidebar;