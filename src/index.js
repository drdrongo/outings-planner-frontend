import './styles/index.scss';
import ReactDOM from 'react-dom';

import App from './App';
import ResponsiveProvider from './providers/responsive_provider';
import ThemeProvider from './providers/theme_provider';
import OutingsProvider from './providers/outings_provider';
import AuthProvider from './providers/auth_provider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<ResponsiveProvider>
			<OutingsProvider>
				<ThemeProvider>
					<AuthProvider>
						<App />
					</AuthProvider>
				</ThemeProvider>
			</OutingsProvider>
		</ResponsiveProvider>
	</BrowserRouter>,
	document.getElementById('root')
);
