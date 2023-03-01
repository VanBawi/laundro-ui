import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';
import { Empty } from 'antd';

export default function TotalOutletsSales({ outletSales }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		let tmp = [];
		if (outletSales) {
			for (let i = 0; i < outletSales.length; i++) {
				tmp.push({
					name: outletSales[i].name.toUpperCase(),
					type: 'Coin',
					value: Number(outletSales[i].coin),
				});

				tmp.push({
					name: outletSales[i].name.toUpperCase(),
					type: 'Epay',
					value: Number(outletSales[i].epay),
				});
			}
			setData(tmp);
		}
	}, [outletSales]);

	// console.log('outletSalesData, data', outletSales);
	// console.log('outletSales', outletSales);

	const config = {
		data: data,
		isStack: true,
		xField: 'value',
		yField: 'name',
		seriesField: 'type',
		autoFit: true,
		label: {
			position: 'middle',
			layout: [
				{
					type: 'interval-adjust-position',
				},
				{
					type: 'interval-hide-overlap',
				},
				{
					type: 'adjust-color',
				},
			],
		},
		barStyle: {
			radius: [2, 2, 0, 0],
		},
	};
	return <div>{data.length ? <Bar {...config} /> : <Empty />}</div>;
}
