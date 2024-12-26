import React from 'react';
import { Link, NavLink } from 'react-router-dom';

type HeaderProps = {
	children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
	return (
		<div
			style={{
				margin: 0,
				position: 'relative',
				top: 0,
				padding: '1rem',
				background: 'yellow',
				color: 'white',
				minHeight: '10vh',
				minWidth: '100vw',
			}}
		>
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="reactMemo"
			>
				React Memo
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/useMemo"
			>
				Use Memo
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/useCallback"
			>
				Use Callback
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/useRef"
			>
				Use Ref
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/useImperativeHandle"
			>
				Use Imperative Handle
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/useReducer"
			>
				Use Reducer
			</NavLink>
			{children && <p>{children}</p>}
		</div>
	);
}

export default Header;
