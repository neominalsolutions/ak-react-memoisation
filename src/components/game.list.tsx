import React, { memo } from 'react';

type Props = {
	onAddItem: (item: any) => void;
	onItemRemove: (item: any) => void;
};

function GameList({ onAddItem, onItemRemove }: Props) {
	// kupona girmeden önceki listelen veri temsili
	const data = [
		{ rate: 1.2, type: 'MS', text: 'GS-FB' },
		{ rate: 2.1, type: 'Beraberlik', text: 'BJK-FB' },
		{ rate: 3.5, type: 'AltÜst', text: 'TS-BJK' },
	];

	return (
		<>
			{data.map((item) => {
				return (
					<div key={item.text}>
						{item.text} / {item.type}
						<button
							onClick={() => {
								onAddItem({ type: 'AddItem', payload: item });
							}}
						>
							Ekle
						</button>
						<button
							onClick={() => {
								onItemRemove({ type: 'RemoveItem', payload: item });
							}}
						>
							Çıkar
						</button>
					</div>
				);
			})}

			<hr></hr>
		</>
	);
}

export default memo(GameList);
