import { useThemeContext } from "../../contexts/theme_context";

const Home = () => {
  const { theme } = useThemeContext();
  return (
		<div
			className="main"
			id="home-page"
			style={{
				...theme,
			}}
		>
      Home
    </div>
  )
}

export default Home;
