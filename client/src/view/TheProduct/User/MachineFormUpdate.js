import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateOutlet, typesLookup, allOutlets } from '../../../reducer/outletReducer';
import './profile.css';
import '../../TheProduct/Sales Performance/salesperformance.css';

const MachineFormUpdate = ({
	outletObject,
	setCurrentTab,
	rmExist,
	machines,
	machineTypes,
	setUpdateSuccess,
	operatorId,
}) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const { types, error, newOutlet } = useSelector((state) => state.outlets);

	const [submit, setSubmit] = useState(false);
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
	// console.log('newOutlet', newOutlet);

	useEffect(() => {
		if (newOutlet && submit) {
			setUpdateSuccess(true);
			setCurrentTab(0);
		}
	}, [newOutlet, submit]);

	useEffect(() => {
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

	const prev = () => {
		setCurrentTab(0);
	};

	const onFinish = (values) => {
		// console.log('values', values);
		// console.log('test object', {
		setSubmit(true);
		dispatch(
			updateOutlet({
				operatorId,
				outlet: outletObject,
				machines: machine.washerForm.concat(machine.dryerForm),
			})
		);
	};

	// const machineId = machines[i].name.toLowerCase();
	// const machineType = machines[i].type;
	// const oneRunTime = machines[i].oneRunTime;
	// const coinRate = machines[i].coinRate;

	useEffect(() => {
		if (outletObject && machines) {
			let washerInput = [];
			let dryerInput = [];

			for (let i = 0; i < outletObject.noOfWashers; i++) {
				const getCurData = machines.length && machines.find((e) => e.id == `${outletObject.fullname}-w${i + 1}`);
				// console.log('getCurData', getCurData);
				if (getCurData) {
					washerInput.push({
						name: getCurData.id.toUpperCase(),
						type: getCurData.machine_brand + ' ' + getCurData.machine_weight,
						coinRate: getCurData.coin_rate,
						oneRunTime: getCurData.one_run_time,
						displayname: getCurData.displayname,
					});
				} else {
					washerInput.push({
						name: `${outletObject.fullname}-w${i + 1}`.toUpperCase(),
						type: '',
						coinRate: 0,
						oneRunTime: 0,
						displayname: `${outletObject.fullname}-W${i + 1}`.toUpperCase(),
					});
				}
			}
			for (let i = 0; i < outletObject.noOfDryers; i++) {
				const getCurData = machines.length && machines.find((e) => e.id == `${outletObject.fullname}-d${i + 1}`);
				if (getCurData) {
					dryerInput.push({
						name: getCurData.id.toUpperCase(),
						type: getCurData.machine_brand + ' ' + getCurData.machine_weight,
						coinRate: getCurData.coin_rate,
						oneRunTime: getCurData.one_run_time,
						displayname: getCurData.displayname,
					});
				} else {
					dryerInput.push({
						name: `${outletObject.fullname}-D${i + 1}`.toUpperCase(),
						type: '',
						coinRate: 0,
						oneRunTime: 0,
						displayname: `${outletObject.fullname}-D${i + 1}`.toUpperCase(),
					});
				}
			}

			setMachine({
				...machine,
				washerForm: washerInput,
				dryerForm: dryerInput,
			});

			let machineOldData = {};

			washerInput.forEach((each, idx) => {
				machineOldData['washertype' + idx] = each.type;
				machineOldData['washerruntime' + idx] = each.oneRunTime;
				machineOldData['washcoinrate' + idx] = each.coinRate;
				machineOldData['washdisplayname' + idx] = each.displayname;
			});

			dryerInput.forEach((each, idx) => {
				machineOldData['dryertype' + idx] = each.type;
				machineOldData['dryerruntime' + idx] = each.oneRunTime;
				machineOldData['dryercoinrate' + idx] = each.coinRate;
				machineOldData['dryerdisplayname' + idx] = each.displayname;
			});

			form.setFieldsValue({
				...machineOldData,
			});
		}
	}, [outletObject, machines]);
	// console.log('machines', machines);
	// const handleTypeChange = (data, key) => {
	//   machine.washerForm[key].type = data;
	// };

	// console.log('machine', machine);

	const columnsWasher = [
		{ title: 'Name', dataIndex: 'name', key: 1 },
		{
			title: 'Display Name',
			dataIndex: 'displayname',
			key: 'displayname',
			render: (a, i, index) => {
				return (
					<Form.Item name={`washdisplayname${index}`}>
						<Input
							placeholder='Display name'
							onChange={(e) => {
								machine.washerForm[index].displayname = e.target.value;
							}}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'name',
			render: (a, i, index) => {
				// console.log('machine.washerForm[index]', machine.washerForm[index]);
				return (
					<Form.Item
						name={`washertype${index}`}
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
			key: 'coinRate',
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
								machine.washerForm[index].coinRate = Number(e.target.value);
							}}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'One Run Time',
			dataIndex: 'oneRunTime',
			key: 'oneRunTime',
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
								machine.washerForm[index].oneRunTime = Number(e.target.value);
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
			key: 'displayname',
			render: (a, i, index) => {
				return (
					<Form.Item name={`dryerdisplayname${index}`}>
						<Input
							placeholder='Display name'
							onChange={(e) => {
								machine.dryerForm[index].displayname = e.target.value;
							}}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'Type',
			dataIndex: 'type',
			key: 'type',
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
			key: 'coinRate',
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
								machine.dryerForm[index].coinRate = Number(e.target.value);
							}}
						/>
					</Form.Item>
				);
			},
		},
		{
			title: 'One Run Time',
			dataIndex: 'oneRunTime',
			key: 'oneRunTime',
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
								machine.dryerForm[index].oneRunTime = Number(e.target.value);
							}}
						/>
					</Form.Item>
				);
			},
		},
	];

	// console.log('machine', machine);
	// console.log('first');

	return (
		<div className='card'>
			<Form form={form} onFinish={onFinish} name='edit_outlet' layout='vertical' autoComplete='off'>
				<div>
					<h2>Washer</h2>
					<Table scroll={{ x: 500 }} id='machine-table' columns={columnsWasher} dataSource={machine.washerForm} />
				</div>
				<div>
					<h2>Dryer</h2>
					<Table scroll={{ x: 500 }} id='machine-table' columns={columnsDryer} dataSource={machine.dryerForm} />
				</div>

				<Button className='ms-3' onClick={prev}>
					Previous
				</Button>

				<Form.Item>
					<Button
						style={{ float: 'right' }}
						size='large'
						type='primary'
						htmlType='submit'
						className='login-form-button me-3'
					>
						Save
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default MachineFormUpdate;
