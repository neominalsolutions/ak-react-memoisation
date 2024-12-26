import React, { memo, useReducer } from 'react';
import { CouponReducer } from '../reducers/coupon.reducer';

type Props = {
	couponState: any;
	onChangeTimes: (args: any) => void;
	onChangeQuantity: (args: any) => void;
};

function CouponList({ couponState, onChangeTimes, onChangeQuantity }: Props) {
	return (
		<>
			{couponState.items.map((item: any) => {
				return (
					<>
						<div key={item.text}>
							<br></br>
							<div>
								{item.text}/{item.type} Oran: {item.rate}
							</div>
							<br></br>
						</div>
					</>
				);
			})}

			{/* misli */}
			<label>Misli</label>
			<select
				onChange={(e: any) => {
					onChangeTimes({
						type: 'ChangeTimes',
						payload: { times: Number(e.target.value) },
					});
				}}
			>
				<option value={1}>1</option>
				<option value={2}>2</option>
			</select>
			<hr></hr>
			{/* kupon adet */}
			<label>Kupon Adet</label>
			<select
				onChange={(e: any) => {
					onChangeQuantity({
						type: 'ChangeQuantity',
						payload: { quantity: Number(e.target.value) },
					});
				}}
			>
				<option value={1}>1</option>
				<option value={2}>2</option>
			</select>

			<hr></hr>
			<p>
				<b>Toplam Tutar: {couponState.totalCost.toFixed(2)}</b>
			</p>
			<p>
				<b>Toplam Kazanç: {couponState.maxEarn.toFixed(2)}</b>
			</p>
		</>
	);
}

export default memo(CouponList);
