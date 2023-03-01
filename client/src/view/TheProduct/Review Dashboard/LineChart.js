import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/plots';

const LineChart = ({ reviews }) => {

	const config = {
		data: reviews,
		xField: 'month',
		yField: 'value',
		yAxis: {
			label: {
				formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
			},
		},
		animation: false,
		seriesField: 'type',
		color: ({ type }) => {
			return type === 'Washer' ? '#F4664A' : type === 'Clean' ? '#30BF78' : type === 'Dryer' ? '#472222' : '#FAAD14';
		},
		// lineStyle: ({ type }) => {
		// 	if (type === 'Clean') {
		// 		return {
		// 			lineDash: [1],
		// 			opacity: 1,
		// 			color: '#F4664A'
		// 		};
		// 	}

		// 	return {
		// 		opacity: 0.5,
		// 	};
		// },
		autoFit: true,
	};
	// console.log('data', data)

	return (
		<div>
			{reviews ? <Line {...config} /> : null}
		</div>
	);
};

export default LineChart;
