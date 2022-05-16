import './styles/index.scss';

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Outings from './routes/outings';
import OutingsShow from './routes/outing';
import ThemeProvider from './providers/theme_provider';
import OutingsProvider from './providers/outings_provider';
import Swiper from './routes/swiper';
import NewOuting from './routes/new_outing/new_outing';
import NewUser from './routes/new_user/new_user';
import Users from './routes/users';
import NewCouple from './routes/new_couple/new_couple';
import AuthProvider from './providers/auth_provider';

ReactDOM.render(
	<OutingsProvider>
	<ThemeProvider>
	<AuthProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="outings" element={<Outings />}>
						<Route
							index
							element={
								<main style={{ padding: '1rem' }}>
									<p>Select an outing</p>
								</main>
							}
						/>
						<Route path=":outingId" element={<OutingsShow />} />
					</Route>
					<Route path="swiper" element={<Swiper />} />
					<Route path="new_outing" element={<NewOuting />} />
					<Route path="new_couple" element={<NewCouple />} />
					<Route path="new_user" element={<NewUser />} />
					<Route path="users" element={<Users />} />
					<Route
						path="*"
						element={
							<main style={{ padding: '1rem' }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</AuthProvider>
	</ThemeProvider>
	</OutingsProvider>
	,
	document.getElementById('root')
);
