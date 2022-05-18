import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/header/header';
import { useAuthContext } from './contexts/auth_context';
import http from './data/http';

function App() {
	const [loaded, setLoaded] = useState(false);
	const { updateMe } = useAuthContext();

	const initializeMe = async () => {
		const response = await http.get('/auth/verify_jwt');
		if (response) {
			updateMe(response);
		}
		setLoaded(true);
	}

	const LoadingScreen = () => {
		return <div style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<CircularProgress color="secondary" />
		</div>
	}

	useEffect(() => {
		initializeMe();
	}, []);

	return (
		<div className="App">
			{loaded ? <>
				<Header />
				<Outlet />
			</> : <LoadingScreen />}
		</div>
	);
}

export default App;
