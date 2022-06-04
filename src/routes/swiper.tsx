import {
	Outlet,
	useSearchParams,
} from 'react-router-dom';
import { useThemeContext } from '../contexts/theme_context';
import SwiperCard from '../components/swiper_card';
import { useOutingsContext } from '../contexts/outings_context';

export default function Swiper() {
	let [searchParams, setSearchParams] = useSearchParams(); // works like setState, but stores data in the search params instead

	const { theme, isLight } = useThemeContext();
  const { outings } = useOutingsContext();

	return (
		<div className="main" style={{
			...theme,
		}}>
      <SwiperCard outing={outings[0]}/>
      <SwiperCard outing={outings[1]}/>
		</div>
	);
};
