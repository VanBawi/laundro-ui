import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Cascader, message, Select } from 'antd';
import { MinusSquareTwoTone, UserOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import ResetRefillModal from './ResetRefillModal';

const Inventory = (props) => {

	const options = [
		{
			value: 'petaling jaya',
			label: 'Petaling Jaya',
			children: [
				{
					value: 'ss2',
					label: 'SS2',
				},
				{
					value: 'ss15',
					label: 'SS15',
				},
			],
		},
		{
			value: 'tdl',
			label: 'TDL',
		},
		{ value: 'kcu', label: 'KCU' },
	];
	const dataSource = [
		{
			key: '1',
			item: 'Bleach',
			currentValue: 0,
			reset: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Reset', 'SS3-BA1')}>
					Reset
				</Button>
			),
			refill: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Refill', 'SS3-BA1')}>
					Refill
				</Button>
			),
		},
		{
			key: '2',
			item: 'Detergent',
			currentValue: 0,
			reset: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Reset', 'SS3-BA1')}>
					Reset
				</Button>
			),
			refill: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Refill', 'SS3-BA1')}>
					Refill
				</Button>
			),
		},
		{
			key: '3',
			item: 'DrySoftener',
			currentValue: 0,
			reset: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Reset', 'SS3-BA1')}>
					Reset
				</Button>
			),
			refill: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Refill', 'SS3-BA1')}>
					Refill
				</Button>
			),
		},
		{
			key: '4',
			item: 'LB',
			currentValue: 0,
			reset: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Reset', 'SS3-BA1')}>
					Reset
				</Button>
			),
			refill: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Refill', 'SS3-BA1')}>
					Refill
				</Button>
			),
		},
		{
			key: '5',
			item: 'Softener',
			currentValue: 0,
			reset: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Reset', 'SS3-BA1')}>
					Reset
				</Button>
			),
			refill: (
				<Button size='small' style={{ background: '#0092E0' }} className='text-white' onClick={() => showModal('Refill', 'SS3-BA1')}>
					Refill
				</Button>
			),
		},
	];


	const [initialData, setInitialData] = useState(dataSource);
	const [detergentLists, setDetergentLists] = useState(dataSource);
	const [searchText, setSearchText] = useState('');
	const [modalName, setModalName] = useState('');
	const [outletName, setOutletName] = useState('');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = (name, outlet) => {
		setModalName(name);
		setOutletName(outlet);
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onChange = (value, selectedOptions) => {
		// console.log(value, selectedOptions);
	};

	const filter = (inputValue, path) =>
		path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

	function filterByValue(array, value) {
		const filterOutObj = array.map(each => {
			return {
				key: each.key,
				item: each.item,
				currentValue: each.currentValue,
			}
		})
		const filtered = filterOutObj.filter((data) => {
			return JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1;
		});
		const newArr = []
		array.forEach(each => {
			const filter = filtered.find(fil => fil.item === each.item)
			if (filter) {
				newArr.push(each)
			}
		})
		return newArr
	}
	function searchBarOnChange(value) {
		setSearchText(value);

		if (!value) {
			setSearchText('');

			setDetergentLists(initialData);
		} else {
			const filteredData = filterByValue(detergentLists, value);
			if (filteredData.length) {
				setDetergentLists(filteredData);
			} else {
				setDetergentLists([]);
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


	const columns = [
		{
			title: 'Item',
			dataIndex: 'item',
			key: 'item',
		},
		{
			title: 'Current Value',
			dataIndex: 'currentValue',
			key: 'currentValue',
		},
		{
			title: 'Reset',
			dataIndex: 'reset',
			key: 'reset',
		},
		{
			title: 'Refill',
			dataIndex: 'refill',
			key: 'refill',
		},
	];

	const handleChange = (value) => {
		// console.log(`selected ${value}`);
	};

	const filterNumber = [
		{
			value: '10',
			label: 10,
		},
		{
			value: '20',
			label: 20,
		},
		{
			value: '50',
			label: 50,
		},
		{
			value: '100',
			label: 100,
		},
	];

	// console.log('initialData', initialData);

	return (
		<div>
			<ResetRefillModal
				isModalOpen={isModalOpen}
				handleOk={handleOk}
				handleCancel={handleCancel}
				modalName={modalName}
				outletName={outletName}
			/>
			<Cascader
				defaultValue={['petaling jaya', 'ss2']}
				options={options}
				onChange={onChange}
				placeholder='Select Outlet'
				showSearch={{
					filter,
				}}
				onSearch={(value) => console.log(value)}
			/>
			<div className='border mt-3'>
				<div className='p-3'>
					<center>
						<div
							className='text-white text-center w-50 p-2 mb-2'
							style={{ background: 'linear-gradient(120deg, #b603c1 0%, #7a38e0 100%)' }}
						>
							Reset/Refill Tokens
						</div>
					</center>

					<div className='d-flex justify-content-around'>
						<div className='text-center'>
							<div> SS3-BA1</div>
							<div>Token</div>
							<Button
								style={{ background: '#0092E0' }}
								className='text-white'
								onClick={() => showModal('Reset', 'SS3-BA1')}
							>
								Reset
							</Button>
						</div>
						<div className='text-center'>
							<div>Current Value</div>
							<div>Token</div>
							<Button
								style={{ background: '#0092E0' }}
								className='text-white'
								onClick={() => showModal('Refill', 'SS3-BA1')}
							>
								Refill
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className='border mt-4'>
				<div className='p-3'>
					<center>
						<div
							className='text-white w-50 p-2 text-center'
							style={{ background: 'linear-gradient(120deg, #b603c1 0%, #7a38e0 100%)' }}
						>
							Reset/Refill Items { }
						</div>
					</center>

					<div className='d-md-flex justify-content-md-around py-4'>
						<div className='text-center'>
							<div>
								<Select
									defaultValue='Select Quantity'
									style={{ width: 260 }}
									onChange={handleChange}
									options={filterNumber}
								/>
							</div>
						</div>
						<div className='text-center py-1'>
							<Input
								prefix={<SearchOutlined />}
								style={{ width: 260 }}
								onChange={(e) => searchBarOnChange(e.target.value)}
								placeholder='Search'
								value={searchText}
								onPressEnter={onSearch}
							/>
						</div>
					</div>
					<div>
						<Table
							// columns={rowsData ? rowsData.columns : []}
							// dataSource={
							//   rowsData
							//     ? rowsData.rows.map((el, idx) => ({
							//         key: idx,
							//         ...el,
							//       }))
							//     : []
							// }
							dataSource={detergentLists}
							columns={columns}
							bordered
							pagination={false}
							scroll={{ x: 500 }}
						/>
					</div>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default Inventory;
