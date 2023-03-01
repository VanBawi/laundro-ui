import { Modal, Transfer, Select, Radio, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { assignOperator, getOperators } from '../../../reducer/adminReducer';

const AssignDistributorModal = ({ isModalOpen, handleOk, handleCancel, distributor }) => {
	// washer
	const dispatch = useDispatch();

	const [initialData, setInitialData] = useState([]);
	const [targetKeys, setTargetKeys] = useState([]);
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [submit, setSubmit] = useState(false);

	const { operators, operator, error, loading } = useSelector((state) => state.adminReducer);

	useEffect(() => {
		dispatch(getOperators());
	}, [dispatch, isModalOpen]);

	useEffect(() => {
		setTargetKeys([]);
	}, []);

	useEffect(() => {
		if (operators) {
			const assigned = [];
			[...operators].forEach((e, i) => {
				if (e.distributorId === distributor.id) {
					assigned.push(e.id);
				}
			});
			setTargetKeys(assigned);

			const obj = [...operators].map((e, i) => {
				return {
					key: e.id,
					title: e.username,
					description: `description of content${i + 1}`,
				};
			});
			// console.log('first, ids', obj);
			setInitialData(obj);
		}
	}, [operators]);

	useEffect(() => {
		if (error) {
			message.error(error.en);
		}
	}, [error]);

	const onChange = (nextTargetKeys, direction, moveKeys) => {
		setTargetKeys(nextTargetKeys);
	};
	const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
		setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
	};

	useEffect(() => {
		if (operator && submit) {
			handleCancel();
			message.success('Successfully assigned.');
		}
	}, [operator, submit]);

	const onSubmit = (e) => {
		if (loading) return;

		if (!targetKeys.length) {
			return message.error('Please select operators');
		}
		setSubmit(true);

		const resBody = {
			distributorId: distributor && distributor.id,
			assigns: targetKeys,
		};

		dispatch(assignOperator(resBody));
	};
	// console.log('operator, submit', operator, submit);
	// console.log('targetKeys', targetKeys);
	// console.log('selectedKeys', selectedKeys);
	return (
		<>
			<Modal
				destroyOnClose={true}
				title='Assign Distributor'
				open={isModalOpen}
				onOk={onSubmit}
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
					{distributor ? distributor.name : ''}
				</div>

				<div className='d-flex justify-content-center'>
					<MobileView>
						<Transfer
							dataSource={initialData}
							listStyle={{ width: 150 }}
							titles={['Operators', 'Assigned Operators']}
							targetKeys={targetKeys}
							selectedKeys={selectedKeys}
							onChange={onChange}
							onSelectChange={onSelectChange}
							render={(item) => item.title}
						/>
					</MobileView>

					<BrowserView>
						<Transfer
							dataSource={initialData}
							listStyle={{ width: 300, height: 350 }}
							titles={['Operators', 'Assigned Operators']}
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
export default AssignDistributorModal;
