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
import OutingsShow from './routes/outing';
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
			console.error(response.errors);
			setLoaded(true);
			return;
		}
		console.log({ responseO: response });
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
							<ProtectedRoute me={me}>
								<NewOuting />
							</ProtectedRoute>
						}
					/>
					<Route
						path="my_couple"
						element={
							<ProtectedRoute me={me}>
								<MyCouple />
							</ProtectedRoute>
						}
					/>

					<Route
						path="outings"
						element={
							<ProtectedRoute me={me}>
								<Outings />
							</ProtectedRoute>
						}
					/>
					<Route
						path="outings/:outingId"
						element={
							<ProtectedRoute me={me}>
								<OutingsShow />
							</ProtectedRoute>
						}
					></Route>
					{/* <Route path=":outingId" element={<OutingsShow />} /> */}
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
					<Route
						path="users"
						element={
							<ProtectedRoute me={me}>
								<Users />
							</ProtectedRoute>
						}
					/>
					<Route
						path="new_couple"
						element={
							<ProtectedRoute me={me}>
								<NewCouple />
							</ProtectedRoute>
						}
					/>
					<Route
						path="couples"
						element={
							<ProtectedRoute me={me}>
								<Couples />
							</ProtectedRoute>
						}
					/>
					{/* 
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

						<Route
							path="*"
							element={
								<main style={{ padding: '1rem' }}>
									<p>There's nothing here!</p>
								</main>
							}
						/> */}
				</Routes>
			</div>

			{isMobile && me.auth && <Navbar />}
		</div>
	);
}

export default App;
