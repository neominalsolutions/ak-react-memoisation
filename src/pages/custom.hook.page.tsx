import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

// localStorage üzerinden bilgi okuma hook
// senaryo => access token bilgilerinin login sonrası parse edilip, login olan kullanıcya ait bilgilerin hook üzerinden erişilmesi

export const useProfile = () => {
	const [profile, setProfile] = useState<any>({
		aud: '',
		sub: '',
		GivenName: '',
		Surname: '',
		Email: '',
		Role: [],
		authenticated: false,
	});

	useEffect(() => {
		const token = localStorage.getItem('x-token');

		if (token) {
			const decoded = jwtDecode(token);
			setProfile({ ...decoded, authenticated: true });
		} else {
			setProfile({ ...profile, authenticated: false });
		}
	}, []);

	useEffect(() => {
		console.log('authenticated changed');
		// burada bir logic uygulanabilir.
	}, [profile.authenticated]);

	const getEmail = () => {
		return profile['Email'];
	};

	const getRoles = (): string[] => {
		return profile['Role'];
	};

	const isLoggedIn = profile['authenticated'];

	return { profile, getEmail, getRoles, isLoggedIn, setProfile };
};

function CustomHookPage() {
	const { profile, setProfile, isLoggedIn } = useProfile();

	if (isLoggedIn) {
		return (
			<>
				<div>Oturum Açan Kullanıcı: {profile.Email}</div>
				<button
					onClick={() => {
						setProfile({ ...profile, authenticated: false });
					}}
				>
					Set Profile
				</button>
			</>
		);
	}
}

export default CustomHookPage;
