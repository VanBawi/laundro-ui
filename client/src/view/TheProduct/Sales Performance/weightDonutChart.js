import React, { useState, useEffect } from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { useSelector, useDispatch } from 'react-redux';
import { annualWeightDistribution } from '../../../reducer/salesData';
import { Skeleton } from 'antd';

const WeightDemoDonut = ({ year, searchNow, salesPerformanceFilter, operatorId, mchType }) => {
	const dispatch = useDispatch();
	const { weightAnnual } = useSelector((state) => state.sales);
	const [data, setData] = useState([{ machine_weight: '', total: 0 }]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (searchNow || salesPerformanceFilter) {
			dispatch(annualWeightDistribution({ year, operatorId }));
		}
	}, [dispatch, year, searchNow, salesPerformanceFilter, operatorId]);

	useEffect(() => {
		if (weightAnnual) {
			const d = weightAnnual.length
				? weightAnnual
						.filter((x) => x.machine_type === mchType)
						.map((e) => {
							return {
								...e,
								total: Number(e.total),
							};
						})
				: [{ machine_weight: '', total: 0 }];
			setData(d);
			setLoading(false);
		}
	}, [weightAnnual, mchType]);

	// console.log("data", weightAnnual);

	function renderStatistic(containerWidth, text, style) {
		const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
		const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

		let scale = 1;

		if (containerWidth < textWidth) {
			scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
		}

		const textStyleStr = `width:${containerWidth}px;`;
		return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
	}

	// const data = [
	//   {
	//     type: "W15KG",
	//     value: 2734,
	//   },
	// ];

	const config = {
		appendPadding: 10,
		data,
		angleField: 'total',
		colorField: 'machine_weight',
		radius: 1,
		innerRadius: 0.64,
		meta: {
			value: {
				formatter: (v) => `${v} ¥`,
			},
		},
		animation: false,
		label: {
			type: 'inner',
			offset: '-50%',
			style: {
				textAlign: 'center',
			},
			autoRotate: false,
			content: '{value}',
		},
		statistic: {
			title: {
				offsetY: -4,
				customHtml: (container, view, datum) => {
					const { width, height } = container.getBoundingClientRect();
					const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
					const text = datum ? datum.machine_weight : 'Total';
					return renderStatistic(d, text, {
						fontSize: 12,
					});
				},
			},
			content: {
				offsetY: 4,
				style: {
					fontSize: '25px',
				},
				customHtml: (container, view, datum, data) => {
					const { width } = container.getBoundingClientRect();
					const text = datum ? `${datum.total}` : `${data.reduce((r, d) => r + d.total, 0)}`;
					return renderStatistic(width, text, {
						fontSize: 16,
					});
				},
			},
		},
		interactions: [
			{
				type: 'element-selected',
			},
			{
				type: 'element-active',
			},
			{
				type: 'pie-statistic-active',
			},
		],
	};
	return (
		<div>
			{loading ? <Skeleton active></Skeleton> : <Pie {...config} style={{ height: '350px', marginTop: '.5rem' }} />}
		</div>
	);
};

export default WeightDemoDonut;
