import React, { memo, useState } from 'react';
import { useProfile } from './custom.hook.page';
import RolePermision from '../components/role.permission';

// Not: React Memo ile Componenti sarmalladığımız durumda Parent Child Component ilişkisi olmalıdır. Parent Componentte bir değişiklik meydana gelidğinde child component render almasını önlemek için kullanılır.

function Parent() {
	console.log('...parent rendering');
	const [random, setRandom] = useState<number>(0);

	const { getRoles } = useProfile();

	console.log('roles', getRoles());

	return (
		<>
			<h1>Parent Component</h1>
			<p>{random}</p>
			<RolePermision allowedRoles="SuperVisor">
				<button
					onClick={() => {
						setRandom(Math.random() * 100);
					}}
				>
					Random Number
				</button>
			</RolePermision>
			<hr></hr>
			{/* <Child /> */}
			{/* <ChildMemo /> */}
			<ChildMemo title={random.toString()} />
		</>
	);
}

type ChildProps = {
	title?: string;
};

// Not: Eğer Parent Component içerisindeki bir state Child Component'e props olarak bağlı ise child component sadece bu durumda render almalıdır. Bunu yapmak içinde Child Component Memoize edilir. (React Memo)

function Child({ title }: ChildProps) {
	// Grid
	console.log('...child rendering');
	return (
		<>
			<h1>Child Component , {title}</h1>
		</>
	);
}

const ChildMemo = memo(Child); // memoize edilmiş referans

function ReactMemoPage() {
	return (
		<>
			<Parent />
		</>
	);
}

export default ReactMemoPage;
