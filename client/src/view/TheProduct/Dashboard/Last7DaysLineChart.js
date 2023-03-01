import { Line } from '@ant-design/plots';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';

export default function Last7DaysLineChart({ weeklySalesData }) {
	const [data, setData] = useState([]);
	useEffect(() => {
		if (weeklySalesData) {
			const data2 = [];
			weeklySalesData.forEach((data) => {
				const d = {
					total: Number(data.total),
					day: Number(data.day),
				};
				data2.push(d);
			});
			setData(data2);
		}
	}, [weeklySalesData]);

	const configuration = {
		data: data,
		xField: 'day',
		yField: 'total',
		xAxis: {
			tickCount: 7,
		},
		point: {
			size: 3,
			shape: 'diamond',
			style: {
				fill: '#5B8FF9',
				stroke: '#5B8FF9',
				lineWidth: 1,
			},
		},
	};

	return <div>{weeklySalesData ? <Line {...configuration} /> : <Empty />}</div>;
}
