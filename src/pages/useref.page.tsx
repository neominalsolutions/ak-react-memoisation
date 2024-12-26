import React, { useEffect, useRef, useState } from 'react';

interface UserStatistics {
	actionName: string;
}

function UseRefPage() {
	const viewCount = useRef(0);
	const statistics = useRef<UserStatistics[]>([]);

	const [random, setRandom] = useState<number>(0);

	console.log('...rendering', viewCount);

	useEffect(() => {
		// Not: State gibi async çalışmaz.
		// Render'a zorlamadığı için senkron olarak değer değişir.
		// Render alınsa dahi bu değer korunur.
		// bu değiştiğinde virtual dom yeniden render almıyor.
		viewCount.current = viewCount.current + 1;
		console.log('viewCount', viewCount);

		statistics.current.push({ actionName: 'ComponentLoad' });

		return () => {
			console.log('domdan çıkış');

			statistics.current.push({ actionName: 'ComponentDispoose' });

			console.log('statistics', statistics.current);

			fetch('/api/componentStatistics', {
				method: 'POST',
				body: JSON.stringify({
					name: 'UseRefPage',
					// viewCount: viewCount.current,
				}),
			});
		};
	}, []);

	return (
		<>
			<p>Random: {random}</p>
			<button
				onClick={() => {
					setRandom(Math.random() * 100);
					statistics.current.push({ actionName: 'ButtonClick' });
				}}
			>
				Generate
			</button>
		</>
	);
}

export default UseRefPage;
