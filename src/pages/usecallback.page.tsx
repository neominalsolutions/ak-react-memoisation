import React, { memo, useCallback, useEffect, useState } from 'react';

// Not: React Memo ile Componenti sarmalladığımız durumda Parent Child Component ilişkisi olmalıdır. Parent Componentte bir değişiklik meydana gelidğinde child component render almasını önlemek için kullanılır.

function Parent() {
	console.log('...parent rendering');
	const [random, setRandom] = useState<number>(0);

	return (
		<>
			<h1>Parent Component</h1>
			<p>{random}</p>
			<button
				onClick={() => {
					setRandom(Math.random() * 100);
				}}
			>
				Random Number
			</button>
			<hr></hr>
			{/* <ChildMemo
				onDomLoaded={() => {
					console.log('component doma yüklendi');
				}}
			/> */}
			<ChildMemo
				onDomLoaded={useCallback(() => {
					console.log('component doma yüklendi');
				}, [])} // [] bırakılırsa doma girdiği andan çıkana kadar action props referansı koru demek.
				// [random] random state değişimine kadar memoize ol demek.
			/>
		</>
	);
}

// Not: useCallback Hook, Child Component'deki action Propsların Parent Component de bir state değişikliği sonrası referanslarında bir güncelleme olmasında dolayı memoisation yapısını bozuyor. Bu durumda action propsların bir önceki referanslarını korumak için useCallback hook ile birlikte memoize edilmesi gerekiyor.

type ChildProps = {
	title?: string;
	onDomLoaded?: () => void; // Dom ilk yüklendiğinde child component parent componente bu bilgiyi action props olarak fırlatsın
};

// Not: Child Component içerisindeki bir durumun Parent Componente iletilmesi için React'da action Props ile event fırlatma mantığı vardır. Bunun dışında bu işlem. ContextAPI veya Redux ile de global state üzerinden yapılabilir.

// Not: Eğer Parent Component içerisindeki bir state Child Component'e props olarak bağlı ise child component sadece bu durumda render almalıdır. Bunu yapmak içinde Child Component Memoize edilir. (React Memo)

function Child({ title, onDomLoaded }: ChildProps) {
	// Grid
	console.log('...child rendering');

	useEffect(() => {
		if (onDomLoaded) {
			onDomLoaded(); // props emit
		}
	}, []);

	return (
		<>
			<h1>Child Component , {title}</h1>
		</>
	);
}

const ChildMemo = memo(Child); // memoize edilmiş referans

function UseCallBackPage() {
	return (
		<>
			<Parent />
		</>
	);
}

export default UseCallBackPage;
