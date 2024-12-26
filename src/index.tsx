// React uygulamayı boostrapt edeceğimiz kod burada olacak.

import React, { useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './layouts/layout';

// import App from './components/App';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactMemoPage from './pages/react.memo.page';
import UseCallBackPage from './pages/usecallback.page';
import UseMemoPage from './pages/usememo.page';
import UseRefPage from './pages/useref.page';

// uygulamanın çalıştığı root element
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
	{
		path: '',
		Component: Layout,
		children: [
			{
				path: 'reactMemo',
				Component: ReactMemoPage,
			},
			{
				path: 'useCallback',
				Component: UseCallBackPage,
			},
			{
				path: 'useMemo',
				Component: UseMemoPage,
			},
			{
				path: 'useRef',
				Component: UseRefPage,
			},
		],
	},
	{
		path: '*',
		element: <>404 Sayfa Bulunamadı</>,
	},
]);

// root.render hangi component load olacağını
root.render(<RouterProvider router={router} />);
