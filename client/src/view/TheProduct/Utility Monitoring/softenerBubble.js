import React from 'react';
import { Liquid } from '@ant-design/plots';

const SoftenerLvl = () => {
	const config = {
		percent: 0.96,
		outline: {
			border: 4,
			distance: 8,
		},
		wave: {
			length: 128,
		},
		color: '#fdd5df',
	};
	return <Liquid {...config} className='level' />;
};

export default SoftenerLvl;
