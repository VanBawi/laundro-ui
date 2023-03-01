import { Bar } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';
import { Empty } from 'antd';

export default function SalesColumnDaily({ salesDaily }) {
	const [data, setData] = useState([]);

	// console.log(salesDaily);

	useEffect(() => {
		if (salesDaily) {
			const sortOder = [...salesDaily]
				.sort((a, b) => {
					return b.total - a.total;
				})
				.map((each) => {
					return {
						name: each.name.toUpperCase(),
						amount: Number(each.total),
					};
				});
			setData(sortOder);
		}
	}, [salesDaily]);

	const config = {
		data: data,
		xField: 'amount',
		yField: 'name',
		yAxis: {
			label: {
				autoRotate: false,
			},
		},
		scrollbar: {
			type: 'vertical',
		},
		legend: {
			position: 'top-left',
		},
		barBackground: {
			style: {
				fill: 'rgba(0,0,0,0.1)',
			},
		},
		interactions: [
			{
				type: 'active-region',
				enable: false,
			},
		],
	};
	return <div>{data ? <Bar style={{ height: '400px' }} {...config} /> : <Empty />}</div>;
}
