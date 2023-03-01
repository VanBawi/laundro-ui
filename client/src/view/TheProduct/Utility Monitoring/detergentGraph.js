import React from 'react';
import './utilitymonitoring.css';
import { Area } from '@ant-design/plots';

const DemoArea = () => {
	const data = [
		{
			Date: '1/1',
			scales: 76,
		},
		{
			Date: '2/1',
			scales: 30,
		},
		{
			Date: '3/1',
			scales: 20,
		},
		{
			Date: '4/1',
			scales: 44,
		},
		{
			Date: '5/1',
			scales: 16,
		},
	];

	const config = {
		data,
		xField: 'Date',
		yField: 'scales',
		xAxis: {
			range: [0, 1],
			tickCount: 5,
		},
		areaStyle: () => {
			return {
				fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
			};
		},
	};

	return <Area {...config} className='graph' />;
};
export default DemoArea;
