export interface CouponItem {
	rate: number; // seçim oranı
	text: string; // seçim yapılan maç
	type: string; // beraberlik maç sonucu
}

export interface CouponState {
	items: CouponItem[]; // seçilen itemlar
	totalCost: number; // toplam maliyet
	maxEarn: number; // maksimum kazanç
	quantity: number; // adet
	times: number; // misli
}

// buradaki bilgilere göre totalCost ve maxEarn hesap algoritması çalıştırmam lazım

// kullanıcının yapacağı eylemler
export type CouponActionType =
	| 'ChangeTimes'
	| 'ChangeQuantity'
	| 'AddItem'
	| 'RemoveItem';

export interface CouponAction {
	// kupon üzerinde hesaplama yaparken meydana gelen eylemleri ve bu eylemleri yerine getirmek için gönderilen değerleri temsil eder. (payload)
	type: CouponActionType;
	payload: any;
}

// reducer state yönetimden sorumlu function
export const CouponReducer = (state: CouponState, action: CouponAction) => {
	if (action.type === 'AddItem') {
		const coupon = state.items.find((x) => x.text == action.payload.text);

		// aynı maç eklenmesin diye kontrol
		if (!coupon) {
			state.items = [...state.items, action.payload];
		}
	} else if (action.type === 'RemoveItem') {
		// kuponda olan maçı sil
		// aynı maç kupona girememli
		state.items = [...state.items.filter((x) => x.text != action.payload.text)];
	} else if (action.type === 'ChangeQuantity') {
		state.quantity = action.payload.quantity;
	} else if (action.type === 'ChangeTimes') {
		state.times = action.payload.times;
	}

	console.log('state.quantity', state.quantity);

	// güncellenen statelere göre hesaplama
	state.totalCost = state.quantity * state.times;

	let maxRates = 1;

	for (const item of state.items) {
		maxRates *= item.rate;
	}
	state.maxEarn = state.totalCost * maxRates;

	return { ...state }; // spread operatör ile hesaplanan state değerini geri dön.
	// Not: state değeri ref type olduğıunda virtual dom yeni state değerinin referansı değişince güncelleneceği için spread operatör kullandık.
};
