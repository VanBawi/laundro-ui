import React, { useState, useEffect } from 'react';
import { Pie, measureTextWidth } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { machineUtilTimeMonth } from '../../../reducer/machineUtilReducer';
import { Skeleton, Button } from 'antd';

const DemoDonutTimeMonth = ({ year, month, monthStr, machineUtilFilter, searchNow, operatorId }) => {
	const dispatch = useDispatch();
	const { machineUtilMonth } = useSelector((state) => state.util);
	const [data, setData] = useState([{ type: '', value: 0 }]);
	const [loading, setLoading] = useState(true);
	const [filterData, setFilterData] = useState('');

	useEffect(() => {
		if (machineUtilFilter || searchNow) {
			dispatch(machineUtilTimeMonth({ year, month, operatorId }));
		}
	}, [dispatch, month, year, machineUtilFilter, searchNow, operatorId]);
	// console.log('machineUtilMonth', machineUtilMonth)
	useEffect(() => {
		if (machineUtilMonth) {
			if (machineUtilMonth.length) {
				const da = [...machineUtilMonth].map((e) => {
					return {
						type: e.type,
						value: Number(e.value),
					};
				});
				setData(da);
			} else {
				setData([{ type: '', value: 0 }]);
			}
			setLoading(false);
		}
	}, [machineUtilMonth]);
	// console.log("Machine Utilization Time (Jan)", machineUtilMonth);

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
		angleField: 'value',
		colorField: 'type',
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
					const text = datum ? datum.type : 'Total';
					return renderStatistic(d, text, {
						fontSize: 25,
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
					const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
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

	const filterDataFunc = (type) => {
		if (type === 'dryer') {
			setFilterData(type);
			const da = machineUtilMonth
				.filter((each) => each.type.includes('dry'))
				.map((e) => {
					return {
						type: e.type && e.type.toUpperCase(),
						value: Number(e.value),
					};
				});
			setData(da);
		}
		if (type === 'washer') {
			setFilterData(type);
			const da = machineUtilMonth
				.filter((each) => each.type.includes('wash'))
				.map((e) => {
					return {
						type: e.type && e.type.toUpperCase(),
						value: Number(e.value),
					};
				});
			setData(da);
		}
	};

	return (
		<div>
			<h5 className='ms-3'>
				Machine Utilization Time ({monthStr}){' '}
				<span>
					<Button
						size='small'
						className='me-1'
						type={filterData === 'dryer' ? 'primary' : ''}
						onClick={() => filterDataFunc('dryer')}
					>
						Dryer
					</Button>
					<Button size='small' type={filterData === 'washer' ? 'primary' : ''} onClick={() => filterDataFunc('washer')}>
						Washer
					</Button>
				</span>
			</h5>

			{loading ? <Skeleton active></Skeleton> : <Pie {...config} style={{ height: '350px', marginTop: '.5rem' }} />}
		</div>
	);
};

export default DemoDonutTimeMonth;
