import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Checkbox, Select, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRM } from '../../../reducer/userReducer';
import './profile.css';
import '../../TheProduct/Sales Performance/salesperformance.css';
import MachineFormUpdate from './MachineFormUpdate';

const UpdateOutletSetting = ({ machines, currentOutlet, setCurrentOutlet, setUpdateSuccess, operatorId }) => {
	const [form] = Form.useForm();

	const dispatch = useDispatch();
	const { Step } = Steps;
	// const { data, setData, setCurrent, setKey, setCurrentTab, setOutletKey } =
	//   props;
	const { rmExist } = useSelector((state) => state.user);
	const { newOutlet } = useSelector((state) => state.outlets);
	const [fiftyCent, setFiftyCent] = useState(false);
	const [cloud, setCloud] = useState(false);
	const [tenPulse, setTenPulse] = useState(false);
	const [checkRes, setCheckRes] = useState(false);
	const [currentTab, setCurrentTab] = useState(0);
	const [options, setOptions] = useState([]);
	const [outletObject, setOutletObject] = useState('');
	const [machineTypes, setMachineTypes] = useState({ washer: [], dryer: [], vending: [], gas: [], chem: [], bill: [] });

	// console.log('currentOutlet', currentOutlet);
	// console.log('machines', machines);

	const [machinesAmount, setMachinesAmount] = useState({
		dryer: 0,
		washer: 0,
		vending: 0,
		chem: 0,
		gas: 0,
		bill: 0,
	});
	// console.log(outletName);

	useEffect(() => {
		if (operatorId) {
			dispatch(fetchRM(operatorId));
		} else {
			dispatch(fetchRM());
		}
	}, [dispatch, operatorId]);

	useEffect(() => {
		if (currentOutlet) {
			form.setFieldsValue({
				id: currentOutlet.id,
				name: currentOutlet.name,
				fullname: currentOutlet.fullname,
				step: currentOutlet.step,
				privkey: currentOutlet.privkey,
				pubkey: currentOutlet.pubkey,
				rmstoreid: currentOutlet.rmstoreid,
				url: currentOutlet.url,
				region: currentOutlet.region,
				city: currentOutlet.city,
				state: currentOutlet.state,
				postcode: currentOutlet.postcode,
				address: currentOutlet.address,
				brand: currentOutlet.brand,
				coin_rate_vending: currentOutlet.coin_rate_vending,
				clientId: currentOutlet.clientId,
				distributorId: currentOutlet.distributorId,
				operatorId: currentOutlet.operatorId,
				pricestrategyId: currentOutlet.pricestrategyId,
				promotionId: currentOutlet.promotionId,
				pubkey: currentOutlet.pubkey,
				rmkeyId: currentOutlet.rmkeyId,
				'machine-mode': currentOutlet.machine_mode,
			});

			setCloud(currentOutlet.cloud);
			setFiftyCent(currentOutlet.fiftycent);
			setTenPulse(currentOutlet.tenpulse);
			setCheckRes(currentOutlet.check_res);
			// console.log('currentOutlet', currentOutlet)
		}
	}, [currentOutlet]);

	useEffect(() => {
		if (machines && machines.length) {
			const washer = [];
			const dryer = [];
			const vending = [];
			const gas = [];
			const chem = [];
			const bill = [];

			let washerType = machines.filter((e) => e.machine_type === 'washer');
			for (let i = 0; i < washerType.length; i++) {
				washer.push({
					...washerType[i],
					value: washerType[i].name,
					label: washerType[i].name,
				});
			}
			let dryerType = machines.filter((e) => e.machine_type === 'dryer');
			for (let i = 0; i < dryerType.length; i++) {
				dryer.push({
					...dryerType[i],
					value: dryerType[i].name,
					label: dryerType[i].name,
				});
			}
			let vendingType = machines.filter((e) => e.machine_type === 'vending');
			for (let i = 0; i < vendingType.length; i++) {
				vending.push({
					...vendingType[i],
					value: vendingType[i].name,
					label: vendingType[i].name,
				});
			}
			let gasType = machines.filter((e) => e.machine_type === 'gasSensor');
			for (let i = 0; i < gasType.length; i++) {
				gas.push({
					...gasType[i],
					value: gasType[i].name,
					label: gasType[i].name,
				});
			}
			let chemType = machines.filter((e) => e.machine_type === 'chemSensor');
			for (let i = 0; i < chemType.length; i++) {
				chem.push({
					...chemType[i],
					value: chemType[i].name,
					label: chemType[i].name,
				});
			}
			let billType = machines.filter((e) => e.machine_type === 'acceptor');
			for (let i = 0; i < billType.length; i++) {
				bill.push({
					...billType[i],
					value: billType[i].name,
					label: billType[i].name,
				});
			}

			// initial numbers from backend
			setMachinesAmount({
				...machinesAmount,
				dryer: dryer.length,
				washer: washer.length,
			});

			form.setFieldsValue({
				noOfDryers: dryer.length,
				noOfWashers: washer.length,
			});

			setMachineTypes({
				washer,
				dryer,
				vending,
				gas,
				chem,
				bill,
			});
		}
	}, [machines]);

	// console.log('currentOutlet', currentOutlet);
	// console.log('machines', machines);

	useEffect(() => {
		if (rmExist) {
			// console.log(rmExist);
			let optionsObj = [];

			for (let i = 0; i < rmExist.length; i++) {
				optionsObj.push({
					value: rmExist[i].id,
					label: rmExist[i].description,
				});
				// console.log(rmExist[i]);
			}
			setOptions(optionsObj);
		}
	}, [rmExist]);

	const onFinish = (values) => {
		// console.log(values);
		let outletObj = {
			...values,
			fiftycent: fiftyCent,
			cloud: cloud,
			tenpulse: tenPulse,
			check_res: checkRes,
			id: currentOutlet.id,
		};
		setOutletObject(outletObj);
		setCurrentTab(1);
	};
	// console.log('temp data', outletObject);
	const outletSteps = [
		{
			title: 'Update Outlet',
			content: '',
		},
		{
			title: 'Update Machine',
			content: (
				<MachineFormUpdate
					operatorId={operatorId}
					newOutlet={newOutlet}
					machines={machines}
					rmExist={rmExist}
					outletObject={outletObject}
					setCurrentTab={setCurrentTab}
					machineTypes={machineTypes}
					setUpdateSuccess={setUpdateSuccess}
				/>
			),
		},
	];

	const outletItems = outletSteps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	// console.log('machines', machines);
	// const { name, fullname, step, privkey, pubkey, rmstoreid, url, region, area, rmkeyId, id, cloud } = req.body;

	return (
		<div className='card'>
			<div style={{ padding: '1rem' }} className='steps-action '>
				<Steps current={currentTab} items={outletItems}>
					<Step title='Update Outlet' current={0} />
					<Step title='Update Machine Details' current={1} />
				</Steps>
				{currentTab === 1 ? <div className='steps-content'>{outletSteps[currentTab].content}</div> : null}
			</div>

			{currentTab === 0 ? (
				<Form form={form} onFinish={onFinish} name='normal_login' className='p-4' layout='vertical'>
					<div className='d-md-flex justify-content-between'>
						<Form.Item
							name='name'
							label='Outlet Name'
							rules={[
								{
									required: true,
									message: 'Please input your Outlet Name!',
								},
							]}
							style={{ width: '100%' }}
							className='me-2'
						>
							<Input disabled onChange={(e) => console.log('e', e)} style={{ padding: '.5rem' }} />
						</Form.Item>
						<Form.Item
							name='fullname'
							label='Outlet Prefix'
							rules={[
								{
									required: true,
									message: 'Please input your Outlet Prefix!',
								},
							]}
							style={{ width: '100%' }}
							className='me-2'
						>
							<Input disabled style={{ padding: '.5rem' }} />
						</Form.Item>
						<Form.Item
							name='brand'
							label='Brand'
							rules={[
								{
									required: true,
									message: 'Please input your brand!',
								},
							]}
							style={{ width: '100%' }}
							className='me-2'
						>
							<Input disabled style={{ padding: '.5rem' }} />
						</Form.Item>
						<Form.Item
							name='url'
							label='Url'
							rules={[
								{
									required: true,
									message: 'Please input your Url!',
								},
							]}
							style={{ width: '100%' }}
						>
							<Input style={{ padding: '.5rem' }} />
						</Form.Item>
					</div>

					<Form.Item
						name='address'
						label='Address'
						rules={[
							{
								required: true,
								message: 'Please confirm your Address!',
							},
						]}
					>
						<Input style={{ padding: '.5rem' }} />
					</Form.Item>
					<div className='d-md-flex justify-content-between'>
						<Form.Item
							name='city'
							label='City'
							rules={[
								{
									required: true,
									message: 'Please confirm your City!',
								},
							]}
							className='me-2'
							style={{ width: '100%' }}
						>
							<Input style={{ padding: '.5rem' }} />
						</Form.Item>
						<Form.Item
							name='state'
							label='State'
							rules={[
								{
									required: true,
									message: 'Please confirm your State!',
								},
							]}
							className='me-2'
							style={{ width: '100%' }}
						>
							<Input style={{ padding: '.5rem' }} />
						</Form.Item>
						<Form.Item
							name='postcode'
							label='Postcode'
							rules={[
								{
									required: true,
									message: 'Please confirm your Postcode!',
								},
							]}
							style={{ width: '100%' }}
						>
							<Input style={{ padding: '.5rem' }} />
						</Form.Item>
					</div>
					<div className='d-flex justify-content-between'>
						<Form.Item
							style={{
								width: '50%',
							}}
							name='rmstoreid'
							label='Rm Store ID'
							rules={[
								{
									required: true,
									message: 'Please confirm your Rm Store ID!',
								},
							]}
							className='me-2'
						>
							<Input style={{ padding: '.5rem' }} />
						</Form.Item>
						<Form.Item
							style={{
								width: '50%',
							}}
							name='step'
							label='Outlet Step'
							rules={[
								{
									required: true,
									message: 'Please confirm your Outlet Step!',
								},
							]}
						>
							<Input style={{ padding: '.5rem' }} type='number' step='0.5' />
						</Form.Item>
					</div>
					<div className='d-md-flex justify-content-evenly'>
						<Form.Item
							style={{ width: '100%' }}
							className='me-2'
							name='noOfWashers'
							label='No. Of Washers'
							rules={[
								{
									required: true,
									message: 'Please confirm your No Of Washers!',
								},
							]}
						>
							<Input min={machinesAmount.washer} type='number' />
						</Form.Item>

						<Form.Item
							style={{ width: '100%' }}
							className='me-2'
							name='noOfDryers'
							label='No. Of Dryers'
							rules={[
								{
									required: true,
									message: 'Please confirm your No Of Dryers!',
								},
							]}
						>
							<Input min={machinesAmount.dryer} type='number' />
						</Form.Item>

						<Form.Item
							style={{ width: '100%' }}
							name='machine-mode'
							label='Machine Mode'
							rules={[
								{
									required: true,
									message: 'Please input machine mode!',
								},
							]}
						>
							<Select
								placeholder='Select mode'
								options={[
									{
										value: 'epayOnly',
										label: 'Epay Only',
									},
									{
										value: 'mix',
										label: 'Mix',
									},
								]}
							/>
						</Form.Item>
					</div>
					<div className='d-flex'>
						<Checkbox checked={cloud} onChange={() => setCloud(!cloud)}>
							Cloud
						</Checkbox>
						<Checkbox checked={tenPulse} onChange={() => setTenPulse(!tenPulse)}>
							Ten Pulse
						</Checkbox>
						<Checkbox checked={fiftyCent} onChange={() => setFiftyCent(!fiftyCent)}>
							Fifty Cent
						</Checkbox>
						<Checkbox checked={checkRes} onChange={() => setCheckRes(!checkRes)}>
							Check Res
						</Checkbox>
					</div>
					<div className='mt-3'>
						<Form.Item
							style={{
								display: 'inline-block',
								width: '150px',
							}}
							name='coin_rate_vending'
							label='Coin Rate Vending'
							rules={[
								{
									required: true,
									message: 'Please input your coin rate vending!',
								},
								{
									validator: (_, value) => {
										let regNumber = /^\d{0,8}(\.\d{0,1})?$/;
										if (!regNumber.test(value)) {
											return Promise.reject(new Error("Invalid number format. Supported format is 'XX.X' OR 'XX'"));
										} else {
											return Promise.resolve();
										}
									},
								},
							]}
							className='me-2'
						>
							<Input type='number' min='0' />
						</Form.Item>
						<Form.Item
							style={{
								display: 'inline-block',
							}}
							name='rmkeyId'
							label='Payment Gateway Config'
							rules={[
								{
									required: true,
									message: 'Please input your payment gateway config!',
								},
							]}
						>
							<Select placeholder='Select RM' options={options} />
						</Form.Item>
					</div>
					<Button
						style={{ marginTop: '1rem' }}
						size='large'
						type='primary'
						htmlType='submit'
						className='login-form-button'
					>
						Next
					</Button>
				</Form>
			) : null}
		</div>
	);
};

export default UpdateOutletSetting;
