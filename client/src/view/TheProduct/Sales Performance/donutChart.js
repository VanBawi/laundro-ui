import React, { useState, useEffect } from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { annualTypeDistribution } from '../../../reducer/salesData';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';

const TypesDonut = ({ year, searchNow, salesPerformanceFilter, operatorId }) => {
	const dispatch = useDispatch();
	const [data, setData] = useState([
		{
			machine_type: '',
			total: 0,
		},
	]);
	const { typesAnnual } = useSelector((state) => state.sales);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (searchNow || salesPerformanceFilter) {
			dispatch(annualTypeDistribution({ year, operatorId }));
		}
	}, [dispatch, year, searchNow, salesPerformanceFilter, operatorId]);
	// console.log('searchNow', searchNow);

	useEffect(() => {
		if (typesAnnual) {
			if (typesAnnual.length) {
				const d = [...typesAnnual].map((e) => {
					return {
						machine_type: e.machine_type.toUpperCase(),
						total: Number(e.total),
					};
				});
				setData(d);
			} else {
				setData([
					{
						machine_type: '',
						total: 0,
					},
				]);
			}

			setLoading(false);
		}
	}, [typesAnnual, year]);

	// console.log('typesAnnual', typesAnnual);
	// console.log('data', data);
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

	const config = {
		appendPadding: 10,
		data,
		angleField: 'total',
		colorField: 'machine_type',
		radius: 1,
		innerRadius: 0.64,
		animation: false,
		meta: {
			total: {
				formatter: (v) => `${v} ¥`,
			},
		},
		label: {
			type: 'inner',
			offset: '-50%',
			style: {
				textAlign: 'center',
				textTransform: 'capitalize',
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
					const text = datum ? datum.machine_type : 'Total';
					return renderStatistic(d, text, {
						fontSize: 28,
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
						fontSize: 25,
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

export default TypesDonut;
