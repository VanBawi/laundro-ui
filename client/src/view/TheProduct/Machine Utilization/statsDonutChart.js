import React, { useState, useEffect } from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { annualTempPreference } from '../../../reducer/machineUtilReducer';

const TempYearPie = (props) => {
	const { year, machineUtilFilter, searchNow, operatorId } = props;
	const dispatch = useDispatch();
	const { annualTemp } = useSelector((state) => state.util);
	const [data, setData] = useState([{ runtype: '', runtime: 0 }]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (machineUtilFilter || searchNow) {
			dispatch(annualTempPreference({ year, operatorId }));
		}
	}, [dispatch, year, searchNow, machineUtilFilter, operatorId]);

	useEffect(() => {
		if (annualTemp) {
			if (annualTemp.length) {
				let obj = [];
				for (let i = 0; i < annualTemp.length; i++) {
					obj.push({
						runtype: annualTemp[i].runtype && annualTemp[i].runtype.toUpperCase(),
						runtime: Number(annualTemp[i].runtime),
					});
				}
				// console.log(obj);
				setData(obj);
			} else {
				setData([{ runtype: '', runtime: 0 }]);
			}

			setLoading(false);
		}
	}, [annualTemp]);

	// console.log('data ---------', data);

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
		angleField: 'runtime',
		colorField: 'runtype',
		radius: 1,
		innerRadius: 0.64,
		animation: false,
		meta: {
			value: {
				formatter: (v) => `${v} ¥`,
			},
		},
		label: {
			type: 'inner',
			offset: '-50%',
			style: {
				textAlign: 'center',
				textTransform: 'uppercase',
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
					const text = datum ? datum.runtype : 'Total';
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
					const text = datum ? `${datum.runtime.toFixed(2)}` : `${data.reduce((r, d) => r + d.runtime, 0).toFixed(2)}`;
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

export default TempYearPie;
