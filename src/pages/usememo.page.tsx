import moment from 'moment';
import React, { useMemo, useState } from 'react';

// Not: Component içerisinde bir değerin kontrollü bir şekilde render'a dahil olmasını işaretlediğimiz bir memoisation tekniği

// Örnek Senaryo => Her bir departmana göre çalışanların maaş ortalamarını farklı chartlarda raporlama ile ilgili bir sürecimiz var.
// Hesaplanan veri component ilk doma yüklenirken hesplanıyor fakat son kullanıcı her bir chart değişiminde bu hesaplanan veri setini farklı bir grafikte görmek istiyor.

function UseMemoPage() {
	const [chartSelection, setChartSelection] = useState<string>('pie');
	const [yearSelection, setYearSelection] = useState<number>(moment().year());

	// expensive bir calculation
	const calcEmployeeSallaryByDepartment = () => {
		console.log('... calculating');
		return 1;
	};

	// yanlış kullanım
	// const employeeSallary = calcEmployeeSallaryByDepartment();

	const employeeSallary = useMemo(
		() => calcEmployeeSallaryByDepartment(),
		[yearSelection]
	); // component domdan çıkana kadar 1 sefere mahsus bu algoritmayı çalıştırıp, employeeSallary değerini memoize et.

	return (
		<>
			<select
				onChange={(e) => {
					setChartSelection(e.target.value);
				}}
			>
				<option value={'pie'}>Pie Chart</option>
				<option value={'bar'}>Bar Chart</option>
				<option value={'line'}>Line Chart</option>
			</select>

			<hr></hr>

			<select
				onChange={(e) => {
					setYearSelection(Number(e.target.value));
				}}
			>
				<option value={2022}>2022</option>
				<option value={2023}>2023</option>
				<option value={2024}>2024</option>
			</select>

			<hr></hr>

			{chartSelection == 'pie' ? (
				<>Pie Chart</>
			) : chartSelection == 'line' ? (
				<>Line Chart</>
			) : (
				<>Bar Chart</>
			)}
		</>
	);
}

export default UseMemoPage;
