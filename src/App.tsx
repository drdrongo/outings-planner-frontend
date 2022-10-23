import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import { useAuthContext } from './contexts/auth_context';
import http from './data/http';
import Couples from './routes/couples/couples';
import NewCouple from './routes/new_couple/new_couple';
import NewOuting from './routes/new_outing/new_outing';
import Login from './routes/login/login';
import Home from './routes/home/home';
import OutingsShow from './routes/outing/outing';
import Outings from './routes/outings/outings';
import ProtectedRoute from './routes/protected_route';
import Signup from './routes/signup/signup';
import Users from './routes/users';
import { useResponsiveContext } from './contexts/responsive_context';
import MyCouple from './routes/my_couple/my_couple';

function App() {
	const { isMobile, isDesktop } = useResponsiveContext();
	const [loaded, setLoaded] = useState(false);
	const { me, updateMe } = useAuthContext();

	const initializeMe = async () => {
		const response = await http.get('/auth/verify_jwt');
		if (response.errors) {
			setLoaded(true);
			return;
		}
		if (response) {
			updateMe(response);
		} else {
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
		<div id="App">
			{!loaded && <LoadingScreen />}

			<Header />
			<div id="layout">
				{isDesktop && me.auth && <Navbar />}

				<Routes>
					{/* Unprotected Routes: */}
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<Login />} />
					<Route path="/" element={<Home />} />
					{/* Protected Routes: */}
					<Route
						path="new_outing"
						element={
							<ProtectedRoute me={me} loaded={loaded}>
								<NewOuting />
							</ProtectedRoute>
						}
					/>
					<Route
						path="my_couple"
						element={
							<ProtectedRoute me={me} loaded={loaded}>
								<MyCouple />
							</ProtectedRoute>
						}
					/>
					<Route
						path="outings"
						element={
							// <ProtectedRoute me={me} loaded={loaded}>
								<Outings />
							//</ProtectedRoute>
						}
					>
						<Route
							path=":outingId"
							element={
									<OutingsShow />
								// <ProtectedRoute me={me} loaded={loaded}>
								// </ProtectedRoute>
							}
						/>
					</Route>
					<Route
						path="users"
						element={
							<ProtectedRoute me={me} loaded={loaded}>
								<Users />
							</ProtectedRoute>
						}
					/>
					<Route
						path="new_couple"
						element={
							<ProtectedRoute me={me} loaded={loaded}>
								<NewCouple />
							</ProtectedRoute>
						}
					/>
					<Route
						path="couples"
						element={
							<ProtectedRoute me={me} loaded={loaded}>
								<Couples />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>

			{isMobile && me.auth && <Navbar />}
		</div>
	);
}

export default App;
