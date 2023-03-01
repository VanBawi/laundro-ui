import React from 'react';
import { Liquid } from '@ant-design/plots';

const DetergentLvl = () => {
	const config = {
		percent: 0.92,
		outline: {
			border: 4,
			distance: 8,
		},
		wave: {
			length: 128,
		},
		color: '#15ffed',
	};
	return <Liquid {...config} className='level' />;
};

export default DetergentLvl;
