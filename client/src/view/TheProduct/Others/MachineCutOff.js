import React, { useState } from 'react';
import { Input, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const priceLists1 = [
	{
		id: 1,
		assigned_by: 'Luise',
		assignedTo: '12 Outlets',
		createdAt: '1/18/2022',
		title: 'Dunge',
	},
	{
		id: 2,
		assigned_by: 'Faun',
		assignedTo: '10 Outlets',
		createdAt: '12/16/2021',
		title: 'Zamboniari',
	},
	{
		id: 3,
		assigned_by: 'Padget',
		assignedTo: '1 Outlets',
		createdAt: '4/18/2022',
		title: 'Cryer',
	},
	{
		id: 4,
		assigned_by: 'Chelsae',
		assignedTo: '12 Outlets',
		createdAt: '6/27/2022',
		title: 'Saddleton',
	},
	{
		id: 5,
		assigned_by: 'Phillipp',
		assignedTo: '55 Outlets',
		createdAt: '7/8/2022',
		title: 'Stringman',
	},
	{
		id: 6,
		assigned_by: 'Brennan',
		assignedTo: '1400 Outlets',
		createdAt: '7/27/2022',
		title: 'Duckels',
	},
	{
		id: 7,
		assigned_by: 'Ana',
		assignedTo: '12 Outlets',
		createdAt: '11/4/2022',
		title: 'Gobat',
	},
	{
		id: 8,
		assigned_by: 'Hildy',
		assignedTo: '12 Outlets',
		createdAt: '3/10/2022',
		title: 'Andrzejowski',
	},
	{
		id: 9,
		assigned_by: 'Tish',
		assignedTo: '152 Outlets',
		createdAt: '7/27/2022',
		title: 'Egleton',
	},
	{
		id: 10,
		assigned_by: 'Shadow',
		assignedTo: '12 Outlets',
		createdAt: '8/17/2022',
		title: 'Stilgo',
	},
];
const MachineCutOff = (props) => {
	const [initialData, setInitialData] = useState(priceLists1);
	const [priceLists, setPriceLists] = useState(priceLists1);
	const [searchText, setSearchText] = useState('');

	// set pricing Modal
	// 1. add search box
	// 2. check the filter search function
	// 3. make a list of created price list
	// 4. add one plus button at front

	function filterByValue(array, value) {
		return array.filter((data) => {
			return JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1;
		});
	}
	function searchBarOnChange(value) {
		setSearchText(value);

		if (!value) {
			setSearchText('');

			setPriceLists(initialData);
		} else {
			const filteredData = filterByValue(priceLists, value);
			if (filteredData.length) {
				setPriceLists(filteredData);
			} else {
				setPriceLists([]);
			}
		}
	}

	const onSearch = (e) => {
		if (!searchText) return;
	};

	const confirm = () => {
		//remove the pricing
		message.success('Successfully removed.');
	};

	// console.log('isModalOpen', isModalOpen);

	return (
		<div>
			<div>
				<Input
					prefix={<SearchOutlined />}
					style={{
						width: 200,
						marginRight: '1rem',
					}}
					onChange={(e) => searchBarOnChange(e.target.value)}
					placeholder='Search'
					value={searchText}
					onPressEnter={onSearch}
				/>
			</div>
			<div>Manual CutOff Machine - SS2</div>
		</div>
	);
};

export default MachineCutOff;
