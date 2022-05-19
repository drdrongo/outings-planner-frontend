import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Header from './components/header/header';
import { useAuthContext } from './contexts/auth_context';
import http from './data/http';
import Layout from './Layout';
import Couples from './routes/couples/couples';
import NewCouple from './routes/new_couple/new_couple';
import NewOuting from './routes/new_outing/new_outing';
import NewUser from './routes/new_user/new_user';
import OutingsShow from './routes/outing';
import Outings from './routes/outings';
import ProtectedRoute from './routes/protected_route';
import Swiper from './routes/swiper';
import Users from './routes/users';

function App() {
	const [loaded, setLoaded] = useState(false);
	const { me, updateMe } = useAuthContext();

	const initializeMe = async () => {
		const response = await http.get('/auth/verify_jwt');
		if (response) {
			updateMe(response);
		}
		setLoaded(true);
	};

	const LoadingScreen = () => {
		return (
			<div
				style={{
					backgroundColor: 'white',
					position: 'fixed',
					inset: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 999999,
				}}
			>
				<CircularProgress color="secondary" />
			</div>
		);
	};

	useEffect(() => {
		initializeMe();
	}, []);

	return (
		<div className="App">
			{!loaded && <LoadingScreen />}

			<BrowserRouter>
				<Header />
				<Routes>
					{/* Unprotected Routes: */}
					<Route path="new_user" element={<NewUser />} />

					{/* Protected Route: */}
					<Route
						path="new_outing"
						element={<ProtectedRoute me={me} />}
					>
						<Route path="new_outing" element={<NewOuting />} />
					</Route>

					<Route path="outings" element={<ProtectedRoute me={me} />}>
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
					</Route>

					<Route path="outings" element={<ProtectedRoute me={me} />}>
						<Route path="swiper" element={<Swiper />} />
					</Route>

					<Route path="outings" element={<ProtectedRoute me={me} />}>
						<Route path="couples" element={<Couples />} />
					</Route>

					<Route path="outings" element={<ProtectedRoute me={me} />}>
						<Route path="new_couple" element={<NewCouple />} />
					</Route>

					<Route path="outings" element={<ProtectedRoute me={me} />}>
						<Route path="users" element={<Users />} />
					</Route>

					<Route
						path="*"
						element={
							<main style={{ padding: '1rem' }}>
								<p>There's nothing here!</p>
							</main>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
