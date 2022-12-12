import './styles.scss';
import OutingsList from "../../components/outings_list/outings_list";
import { useAuthContext } from "../../contexts/auth_context";
import { useOutingsContext } from "../../contexts/outings_context";
import { useThemeContext } from "../../contexts/theme_context";

const AuthHome = () => {
	return <div id="home-inner">
		<h1>Top Outings</h1>
		<OutingsList />
	</div>
}

const Home = () => {
  const { theme } = useThemeContext();
	const { me } = useAuthContext();

	const UnAuthHome = () => (
		<div id="home-inner">
			<h1>Erica and Hayato's Outing Planner</h1>
		</div>
	)

  return (
		<div
			className="main"
			id="home-page"
			style={{
				...theme,
			}}
		>
			{me.auth ? (
				<AuthHome />
			) : (
				<UnAuthHome />
			)}
    </div>
  )
}

export default Home;
