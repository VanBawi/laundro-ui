import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../components/loading';

const LaundroTheme = lazy(() => import('./laundroTheme'));

const ThemeController = ({ children }) => {
	const { theme } = useSelector((state) => state.theme);
	// console.log('theme', theme)

	const themeController = () => {
		if (theme === 'laundro') return <LaundroTheme />;
	};

	return (
		<>
			<Suspense fallback={<Loading></Loading>}>
				{themeController()}
				{children}
			</Suspense>
		</>
	);
};

export default ThemeController;
