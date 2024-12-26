import React, { useCallback, useReducer } from 'react';
import GameList from '../components/game.list';
import CouponList from '../components/coupon.list';
import { CouponReducer, CouponState } from '../reducers/coupon.reducer';

function UseReducerPage() {
	// alt componentlerin state sorumlu olan parent component
	// api dan load edip o init değeri üzerimden de başlatılabilir.
	const initState: CouponState = {
		items: [],
		quantity: 1,
		times: 1,
		maxEarn: 0,
		totalCost: 0,
	};

	// ortak state paylaşımı componentlere props ile geçildi.
	const [couponState, dispatch] = useReducer(CouponReducer, initState);

	return (
		<>
			{/* Maç arayüzü */}
			<GameList
				onAddItem={useCallback((args: any) => {
					dispatch(args);
				}, [])}
				onItemRemove={useCallback((args: any) => {
					dispatch(args);
				}, [])}
			/>

			{/* Kupon Arayüzü */}

			<CouponList
				couponState={couponState}
				onChangeQuantity={useCallback((args: any) => {
					dispatch(args);
				}, [])}
				onChangeTimes={useCallback((args: any) => {
					dispatch(args);
				}, [])}
			/>
		</>
	);
}

export default UseReducerPage;
