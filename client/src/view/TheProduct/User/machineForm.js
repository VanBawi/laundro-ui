import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Table, message, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createOutlet, typesLookup } from '../../../reducer/outletReducer';
import check from '../../../images/check.png';
import './profile.css';
import '../../TheProduct/Sales Performance/salesperformance.css';
import { useNavigate, useLocation } from 'react-router-dom';

const MachineForm = ({
	rm,
	data,
	setData,
	setCurrent,
	current,
	setOutletCurrent,
	setOutletKey,
	rmExist,
	operatorId,
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const location = useLocation();

	const { types, error, newOutlet } = useSelector((state) => state.outlets);

	const stateData = location.state;
	const outletData = data.outletData;

	const [dashModal, setDashModal] = useState(false);
	const [modal, setModal] = useState(false);
	const [washer] = useState(Number(outletData.noOfWashers));
	const [dryer] = useState(Number(outletData.noOfDryers));

	const [type, setType] = useState({
		washer: [],
		dryer: [],
		vending: [],
		gas: [],
		chem: [],
		bill: [],
	});

	const [machine, setMachine] = useState({
		washerForm: [],
		dryerForm: [],
		vendingForm: [],
		gasForm: [],
		billForm: [],
		chemForm: [],
	});

	useEffect(() => {
		// no need token
		dispatch(typesLookup());
	}, [dispatch]);

	useEffect(() => {
		if (types) {
			let arr1 = [];
			let arr2 = [];
			let arr3 = [];
			let arr4 = [];
			let arr5 = [];
			let arr6 = [];
			let washerType = types.filter((e) => e.type === 'washer');
			for (let i = 0; i < washerType.length; i++) {
				arr1.push({
					value: washerType[i].name,
					label: washerType[i].name,
				});
			}
			let dryerType = types.filter((e) => e.type === 'dryer');
			for (let i = 0; i < dryerType.length; i++) {
				arr2.push({
					value: dryerType[i].name,
					label: dryerType[i].name,
				});
			}
			let vendingType = types.filter((e) => e.type === 'vending');
			for (let i = 0; i < vendingType.length; i++) {
				arr3.push({
					value: vendingType[i].name,
					label: vendingType[i].name,
				});
			}
			let gasType = types.filter((e) => e.type === 'gasSensor');
			for (let i = 0; i < gasType.length; i++) {
				arr4.push({
					value: gasType[i].name,
					label: gasType[i].name,
				});
			}
			let chemType = types.filter((e) => e.type === 'chemSensor');
			for (let i = 0; i < chemType.length; i++) {
				arr5.push({
					value: chemType[i].name,
					label: chemType[i].name,
				});
			}
			let billType = types.filter((e) => e.type === 'acceptor');
			for (let i = 0; i < billType.length; i++) {
				arr6.push({
					value: billType[i].name,
					label: billType[i].name,
				});
			}
			setType({
				...type,
				washer: arr1,
				dryer: arr2,
				vending: arr3,
				chem: arr4,
				gas: arr5,
				bill: arr6,
			});
		}
	}, [types]);

	useEffect(() => {
		if (error) {
			if (error.en) {
				message.error(error.en);
			}
		}
	}, [error]);

	useEffect(() => {
		if (rm && newOutlet) {
			// console.log("new user modal");
			setDashModal(true);
		} else if (rmExist.length && newOutlet) {
			setModal(true);
		}
	}, [newOutlet]);

	// console.log(newOutlet);

	const prev = () => {
		setCurrent(1);
		setOutletCurrent(0);
	};

	const onFinish = (values) => {
		// console.log('machine', machine);
		dispatch(
			createOutlet({
				operatorId,
				outlet: outletData,
				machines: machine.washerForm.concat(machine.dryerForm),
			})
		);
	};

	useEffect(() => {
		let washerInput = [];
		let dryerInput = [];

		for (let i = 0; i < washer; i++) {
			washerInput.push({
				name: `${outletData.fullname}-w${i + 1}`,
				displayname: `${outletData.fullname.toUpperCase()}-W${i + 1}`,
				type: '',
				coinRate: 0,
				oneRunTime: 0,
			});
		}
		for (let i = 0; i < dryer; i++) {
			dryerInput.push({
				name: `${outletData.fullname}-d${i + 1}`,
				displayname: `${outletData.fullname.toUpperCase()}-D${i + 1}`,
				type: '',
				coinRate: 0,
				oneRunTime: 0,
			});
		}

		setMachine({
			...machine,
			washerForm: washerInput,
			dryerForm: dryerInput,
		});
	}, [outletData]);

	const columnsWasher = [
		{ title: 'Name', dataIndex: 'name', key: 1 },
		{
			title: 'Display Name',
			dataIndex: 'displayname',
			key: 2,
			render: (a, i, index) => {
				return (
					<Form.Item name={`washdisplayname${index}`}>
						<Input
							placeholder='Display name'
							onChange={(e) => {
								machine.washerForm[index].displayname = e.target.value;
							}}
							defaultValue={machine.washerForm[index].displayname}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 3,
			render: (a, i, index) => {
				return (
					<Form.Item
						name={'washertype' + index}
						rules={[
							{
								required: true,
								message: 'Please choose your washer type!',
							},
						]}
					>
						<Select
							placeholder='Select Washer Type'
							onChange={(e) => {
								machine.washerForm[index].type = e;
							}}
							options={type.washer}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'Coin Rate',
			dataIndex: 'coinRate',
			key: 4,
			render: (a, i, index) => {
				return (
					<Form.Item
						name={`washcoinrate${index}`}
						rules={[
							{
								required: true,
								message: 'Please input coin rate!',
							},
						]}
					>
						<Input
							step={0.5}
							min={0.5}
							type='number'
							placeholder='Coin Rate'
							onChange={(e) => {
								machine.washerForm[index].coinRate = e.target.value;
							}}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'One Run Time',
			dataIndex: 'oneRunTime',
			key: 5,
			render: (a, i, index) => {
				return (
					<Form.Item
						name={`washerruntime${index}`}
						rules={[
							{
								required: true,
								message: 'Please input your one run time!',
							},
						]}
					>
						<Input
							step={0.5}
							min={0.5}
							type='number'
							placeholder='One Run Time'
							onChange={(e) => {
								machine.washerForm[index].oneRunTime = e.target.value;
							}}
						/>
					</Form.Item>
				);
			},
		},
	];
	const columnsDryer = [
		{ title: 'Name', dataIndex: 'name', key: 1 },
		{
			title: 'Display Name',
			dataIndex: 'displayname',
			key: 2,
			render: (a, i, index) => {
				return (
					<Form.Item name={`dryerdisplayname${index}`}>
						<Input
							placeholder='Display name'
							onChange={(e) => {
								machine.dryerForm[index].displayname = e.target.value;
							}}
							defaultValue={machine.dryerForm[index].displayname}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 3,
			render: (a, i, index) => {
				return (
					<Form.Item
						name={`dryertype${index}`}
						rules={[
							{
								required: true,
								message: 'Please choose your dryer type!',
							},
						]}
					>
						<Select
							placeholder='Select Dryer Type'
							onChange={(e) => {
								machine.dryerForm[index].type = e;
							}}
							options={type.dryer}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'Coin Rate',
			dataIndex: 'coinRate',
			key: 4,
			render: (a, i, index) => {
				return (
					<Form.Item
						name={`dryercoinrate${index}`}
						rules={[
							{
								required: true,
								message: 'Please input coin rate!',
							},
						]}
					>
						<Input
							step={0.5}
							min={0.5}
							type='number'
							placeholder='Coin Rate'
							onChange={(e) => {
								machine.dryerForm[index].coinRate = e.target.value;
							}}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'One Run Time',
			dataIndex: 'oneRunTime',
			key: 5,
			render: (a, i, index) => {
				return (
					<Form.Item
						name={`dryerruntime${index}`}
						rules={[
							{
								required: true,
								message: 'Please input one run time!',
							},
						]}
					>
						<Input
							step={0.5}
							min={0.5}
							type='number'
							placeholder='One Run Time'
							onChange={(e) => {
								machine.dryerForm[index].oneRunTime = e.target.value;
							}}
						/>
					</Form.Item>
				);
			},
		},
	];
	// console.log('machine', machine);

	return (
		<div className='card'>
			<Form
				onFinish={onFinish}
				name='create_outlet'
				className='p-4'
				layout='vertical'
				autoComplete='off'
				initialValues={{
					remember: true,
				}}
			>
				<div>
					<h2>Washer</h2>
					<Table
						id='machine-table'
						columns={columnsWasher}
						dataSource={machine.washerForm}
						scroll={{ x: 500 }}
						pagination={false}
					/>
				</div>
				<div>
					<h2>Dryer</h2>
					<Table
						id='machine-table'
						columns={columnsDryer}
						dataSource={machine.dryerForm}
						scroll={{ x: 500 }}
						pagination={false}
					/>
				</div>
				{dashModal ? (
					<Modal
						closable={true}
						centered
						mask={true}
						open={dashModal}
						cancelButtonProps={{ style: { display: 'none' } }}
						cancelText='Cancel'
						onCancel={() => {
							navigate('/mainDashboard', { state: stateData });
						}}
						onOk={() => {
							navigate('/mainDashboard', { state: stateData });
						}}
						okText='Redirect me'
						width={500}
					>
						<h4>Thank you for creating your RM and Outlet! You will be redirected to dashboard.</h4>
						<img src={check} style={{ margin: '2rem auto', display: 'block', width: '100px' }} alt='success check' />
					</Modal>
				) : null}
				{modal ? (
					<Modal
						closable={true}
						centered
						open={modal}
						cancelButtonProps={{ style: { display: 'none' } }}
						onCancel={() => {
							setModal(false);
							window.location.reload(true);
						}}
						cancelText='Cancel'
						onOk={() => {
							setModal(false);
							window.location.reload(true);
						}}
						width={500}
					>
						<h4>Thank you, your outlet has been created successfully!</h4>
						<img src={check} style={{ margin: '0 auto', display: 'block', width: '100px' }} alt='success check' />
					</Modal>
				) : null}

				<Button style={{ margin: '0 8px' }} onClick={prev}>
					Previous
				</Button>

				<Form.Item>
					<Button
						style={{ marginTop: '1rem', float: 'right' }}
						size='large'
						type='primary'
						htmlType='submit'
						className='login-form-button'
					>
						Complete
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default MachineForm;
