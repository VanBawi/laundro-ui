import React, { useState, useEffect } from 'react';
import { DualAxes } from '@ant-design/plots';
import { outletDailyUtil } from '../../../reducer/machineUtilReducer';
import { useDispatch, useSelector } from 'react-redux';

const DualAxeDailyOutlet = ({ year, month, outletId, operatorId }) => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const { outletUtilDaily } = useSelector((state) => state.util);

	useEffect(() => {
		dispatch(outletDailyUtil(year, month, outletId, operatorId));
	}, [outletId, year, month]);

	// console.log(outletId, year, month);
	// console.log('outletUtilDaily', outletUtilDaily);

	useEffect(() => {
		if (outletUtilDaily) setData(outletUtilDaily);
	}, [outletUtilDaily]);

	// console.log('data', data);

	const config = {
		data: [data, data],
		xField: 'date',
		yField: ['dryer', 'washer'],
		geometryOptions: [
			{
				geometry: 'line',
				color: '#5B8FF9',
			},
			{
				geometry: 'line',
				color: '#5AD8A6',
			},
		],
	};
	return <DualAxes {...config} />;
};

export default DualAxeDailyOutlet;
