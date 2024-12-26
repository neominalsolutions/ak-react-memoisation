import React, {
	ForwardedRef,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';

type GridHandle = {
	refresh: () => void;
	setData: (data: any) => void;
};

type GridProps = {};

// ForwardedRef referansı başka bir component üzerinden forwaded edilmiş demek.

const Grid = (props: GridProps, ref: ForwardedRef<GridHandle | null>) => {
	const refreshCount = useRef(0);

	useImperativeHandle(ref, () => {
		return {
			refresh: () => {
				refreshCount.current = refreshCount.current + 1;
				console.log('grid Refresh, load data from api', refreshCount.current);
			},
			setData: (data: any) => {
				console.log('set Data', data);
			},
		};
	});

	return (
		<>
			<h1>Grid Component</h1>
		</>
	);
};

const GridForwadedRef = forwardRef(Grid);

function UseImperativeHandlerPage() {
	const gridRef = useRef<GridHandle>(null);

	useEffect(() => {
		// timing policy her 1 saniye 1 grid refleshle

		let interval = setInterval(() => {
			gridRef.current?.refresh();
		}, 1000);

		console.log('interval', interval);

		return () => {
			// Her componenten çıkışta interval temizle
			console.log('clear');
			clearInterval(interval);
		};
	}, []);

	return (
		<>
			<GridForwadedRef ref={gridRef} />
			<button
				onClick={() => {
					gridRef.current?.setData({ id: 1, name: 'test' });
				}}
			>
				Set Data
			</button>
		</>
	);
}

export default UseImperativeHandlerPage;
