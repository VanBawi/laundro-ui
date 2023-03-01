import { Modal, Transfer, Select, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { allOutlets } from '../../../../reducer/outletReducer';
import { assignPricing, getPriceList } from '../../../../reducer/priceSettingReducer';
import { statesArr2 } from '../../../../utilities/helperData';

const AssignPriceModal = ({ outlets, isModalOpen, handleOk, handleCancel, priceLists, pricingData, operatorId }) => {
	// washer
	const dispatch = useDispatch();

	const [initialOutlets, setInitialOutlets] = useState([]);
	const [mockData, setMockData] = useState([]);
	const [targetKeys, setTargetKeys] = useState(mockData);
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [submit, setSubmit] = useState(false);

	const { assigned, loading } = useSelector((state) => state.pricing);

	useEffect(() => {
		setTargetKeys([]);
	}, []);

	useEffect(() => {
		if (assigned && submit) {
			handleCancel();
			message.success('Successfully assigned price.');
			setTimeout(() => {
				dispatch(getPriceList(operatorId));
				if (operatorId) {
					dispatch(allOutlets(operatorId));
				} else {
					dispatch(allOutlets());
				}
			}, 1000);
		}
	}, [assigned, submit]);

	// console.log('price, price', price, operatorId);

	useEffect(() => {
		if (pricingData && isModalOpen) {
			if (pricingData.outlets.length) {
				const ids = pricingData.outlets.map((e) => e.id);
				setTargetKeys(ids);
			}
		}
	}, [pricingData, isModalOpen]);

	useEffect(() => {
		if (outlets.length) {
			const data = outlets.map((outlet, i) => ({
				key: outlet.id,
				title: outlet.fullname,
				description: `description of content${i + 1}`,
				area: outlet.area,
				pricestrategyId: outlet.pricestrategyId,
			}));
			// console.log('data', data)
			setMockData(data);
			setInitialOutlets(data);
		}
	}, [outlets]);

	const onChange = (nextTargetKeys, direction, moveKeys) => {
		setTargetKeys(nextTargetKeys);
	};
	const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
		setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
	};

	const handleChange = (value) => {
		// console.log(`selected ${value}`)

		if (value === 'All') {
			setMockData(initialOutlets);
		} else {
			const filtered2 = initialOutlets.filter((outlet) => {
				if (outlet.area) {
					return outlet.area.toLowerCase() == value.toLowerCase();
				}
			});

			if (filtered2.length) {
				setMockData(filtered2);
			} else {
				setMockData([]);
			}
			// console.log(filtered2)
		}
	};

	// console.log('initialOutlets', initialOutlets);

	const submitFunc = (e) => {
		if (!pricingData.id) {
			return message.error('Please select pricing option.');
		}

		const resBody = {
			pricestrategyId: pricingData.id,
			data: targetKeys,
			operatorId,
		};

		dispatch(assignPricing(resBody));
		setSubmit(true);
	};
	// console.log('pricingData', pricingData);
	// console.log('targetKeys', targetKeys)
	// console.log('selectedKeys', selectedKeys)
	return (
		<>
			<Modal
				destroyOnClose={true}
				title='Assign Outlets'
				open={isModalOpen}
				onOk={submitFunc}
				onCancel={() => {
					handleCancel();
					setSelectedKeys([]);
					setTargetKeys([]);
				}}
				okText={loading ? 'Loading...' : 'Save'}
				cancelText='Cancel'
				width={700}
			>
				<div className='mb-3 p-3' style={{ background: '#F8F8F8' }}>
					<h5>Pricing </h5>
					{pricingData ? pricingData.name : ''}
				</div>

				<div className='d-flex justify-content-center'>
					<MobileView>
						<div>Filter Outlets</div>
						<div className='d-flex justify-content-between'>
							<div className='transfer-top-left mb-2'>
								<div className='mt-1'>
									<div>
										<Select
											placeholder='Select State'
											style={{ width: '95%' }}
											onChange={handleChange}
											options={statesArr2}
											clearIcon
										/>
									</div>
								</div>
							</div>
							<div className='transfer-top-right align-self-end ps-3'>Assigned</div>
						</div>
						<Transfer
							dataSource={mockData}
							listStyle={{ width: 150 }}
							titles={['Outlets', 'Assigned Outlets']}
							targetKeys={targetKeys}
							selectedKeys={selectedKeys}
							onChange={onChange}
							onSelectChange={onSelectChange}
							render={(item) => item.title}
						/>
					</MobileView>
					<BrowserView>
						<div className='d-flex justify-content-between'>
							<div className='border transfer-top-left p-2'>
								<div>Filter Outlets</div>
								<div className='mt-2'>
									<div>
										<label htmlFor='state' style={{ width: '15%' }}>
											State
										</label>
										<Select
											placeholder='Select state'
											style={{ width: '75%' }}
											onChange={handleChange}
											options={statesArr2}
										/>
									</div>
								</div>
							</div>
							<div className='border transfer-top-right p-2 d-flex'>
								<div className='align-self-end '>Assign To:</div>
							</div>
						</div>

						<Transfer
							dataSource={mockData}
							listStyle={{ width: 300, height: 350 }}
							titles={['Outlets', 'Assigned Outlets']}
							targetKeys={targetKeys}
							selectedKeys={selectedKeys}
							onChange={onChange}
							onSelectChange={onSelectChange}
							render={(item) => item.title}
						/>
					</BrowserView>
				</div>
			</Modal>
		</>
	);
};
export default AssignPriceModal;
