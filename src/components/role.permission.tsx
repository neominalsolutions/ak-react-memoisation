import React from 'react';
import { useProfile } from '../pages/custom.hook.page';

type Props = {
	children: React.ReactNode;
	allowedRoles?: string;
};

export function RolePermision({ children, allowedRoles = '' }: Props) {
	const { getRoles } = useProfile();
	// reusable

	console.log('allowed', allowedRoles, getRoles());

	const roles = getRoles().toString();
	console.log('roles', roles);
	var regex = new RegExp(allowedRoles, 'i');

	if (allowedRoles) {
		if (regex.test(roles)) {
			console.log('allowed 2');
			return <>{children}</>;
		} else return <></>;
	} else {
		return <></>;
	}
}

export default RolePermision;
