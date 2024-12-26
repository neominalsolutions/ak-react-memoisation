// React uygulamayı boostrapt edeceğimiz kod burada olacak.

import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './layouts/layout';

// import App from './components/App';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactMemoPage from './pages/react.memo.page';

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
		],
	},
	{
		path: '*',
		element: <>404 Sayfa Bulunamadı</>,
	},
]);

// root.render hangi component load olacağını
root.render(<RouterProvider router={router} />);
