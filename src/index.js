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
import Couples from './routes/couples/couples';
import ProtectedRoute from './routes/protected_route';

ReactDOM.render(
	<OutingsProvider>
	<ThemeProvider>
	<AuthProvider>
		<App />
	</AuthProvider>
	</ThemeProvider>
	</OutingsProvider>
	,
	document.getElementById('root')
);
