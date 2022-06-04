import { Button } from '@mui/material';
import { useEffect } from 'react';
import {
	Outlet,
	useSearchParams,
} from 'react-router-dom';
import OutingsList from '../../components/outings_list/outings_list';
import { useOutingsContext } from '../../contexts/outings_context';
import { useThemeContext } from '../../contexts/theme_context';
import http from '../../data/http';

export default function Outings() {
	let [searchParams, setSearchParams] = useSearchParams(); // works like setState, but stores data in the search params instead
	const { outings, doSearch, clearSearch } = useOutingsContext();
	const { theme, isLight } = useThemeContext();

	useEffect(() => { // TODO: Make this versatile and work for other search fields, like genre.
		const title = searchParams.get('title');
		if (title) {
			doSearch('title', title)
		} else {
			clearSearch();
		}
	}, [searchParams]);

	return (
		<div className="main" style={{
			...theme,
		}}>
			<nav
				style={{
					borderRight: 'solid 1px',
					padding: '1rem',
				}}
			>
				<input
					value={searchParams.get('title') || ''}
					onChange={event => {
						const title = event.target.value;
						if (title) {
							setSearchParams({ title });
						} else {
							setSearchParams({});
						}
					}}
				/>
				<OutingsList outings={outings}/>
			</nav>
			<Outlet /> {/* Renders the child route's element, if there is one.*/}
		</div>
	);
};
