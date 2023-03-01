import React, { useState, useEffect } from 'react';
import { Button, Steps, message, Select } from 'antd';
import { AppstoreAddOutlined, FormOutlined } from '@ant-design/icons';
import avatar from '../../../images/avatars/thumb-13.jpg';
import store from '../../../images/others/store.png';
import './profile.css';
import '../../TheProduct/Sales Performance/salesperformance.css';
import { allOutlets } from '../../../reducer/outletReducer';
import { useDispatch, useSelector } from 'react-redux';
import OutletForm from './outletForm';
import RmForm from './rmForm';
import MachineForm from './machineForm';
import { fetchOperators, fetchRM } from '../../../reducer/userReducer';
import { remoteMachine } from '../../../reducer/remoteReducer';
import QrCode from './QrCode';
import UpdateOutletSetting from './UpdateOutletSetting';

const { Step } = Steps;

const UserSetting = () => {
	const dispatch = useDispatch();
	const { distributor, operator, operators, error, rmExist, rm } = useSelector((state) => state.user);
	const { machineData } = useSelector((state) => state.remote);
	const { outlets } = useSelector((state) => state.outlets);
	const { theme } = useSelector((state) => state.theme);
	const [form, setForm] = useState(false);
	const [rmForm, setRmForm] = useState(false);

	const [current, setCurrent] = useState(0);
	const [outletCurrent, setOutletCurrent] = useState(0);
	const [washers, setWashers] = useState(0);
	const [dryers, setDryers] = useState(0);
	const [vendings, setVendings] = useState(0);
	const [profileAvatar, setProfileAvatar] = useState(null);
	const [qr, setQR] = useState(false);
	const [outletName, setOutletName] = useState('');
	const [machines, setMachines] = useState([]);
	const [data, setData] = useState({
		rmData: '',
		outletData: '',
		machineData: '',
	});
	const [currentOutlet, setCurrentOutlet] = useState('');
	const [updateSuccess, setUpdateSuccess] = useState(false);

	// console.log('machineLoggings', machineLoggings)
	const [operatorsOptions, setOperatorsOptions] = useState([]);

	const [operatorId, setOperatorId] = useState('');

	useEffect(() => {
		if (distributor) {
			dispatch(fetchOperators());
		}
	}, [dispatch, distributor]);

	useEffect(() => {
		if (operators) {
			let operatorArr = [];
			for (let i = 0; i < operators.length; i++) {
				operatorArr.push({ value: operators[i].id, label: operators[i].username });
			}

			setOperatorsOptions(operatorArr);

			if (operatorArr.length) {
				setOperatorId(operatorArr[0].value);
			}
		}
	}, [operators]);

	useEffect(() => {
		if (operator) {
			dispatch(allOutlets());
			dispatch(fetchRM());
			dispatch(remoteMachine());
		}
	}, [dispatch, operator]);

	useEffect(() => {
		if (distributor && operatorId) {
			dispatch(allOutlets(operatorId));
			dispatch(fetchRM(operatorId));
			dispatch(remoteMachine());
		}
	}, [dispatch, distributor, operatorId]);

	useEffect(() => {
		if (updateSuccess) {
			message.success('Updated successfully.');
			setTimeout(() => {
				if (operatorId) {
					dispatch(allOutlets(operatorId));
				} else {
					dispatch(allOutlets());
				}

				if (operatorId) {
					dispatch(fetchRM(operatorId));
				} else {
					dispatch(fetchRM());
				}

				dispatch(remoteMachine());
				setUpdateSuccess(false);
				setCurrentOutlet('');
			}, 1000);
		}
	}, [dispatch, updateSuccess]);

	useEffect(() => {
		if (machineData) {
			let washerAmount = machineData.filter((e) => e.machine_type === 'washer');
			let dryerAmount = machineData.filter((e) => e.machine_type === 'dryer');
			let vendingAmount = machineData.filter((e) => e.machine_type === 'vending');
			setWashers(washerAmount);
			setDryers(dryerAmount);
			setVendings(vendingAmount);
		}
	}, [machineData]);

	useEffect(() => {
		if (error) {
			if (error.en) {
				message.error(error.en);
			}
		}
	}, [error]);

	// console.log('rmExist', rmExist);
	// console.log('outlets', outlets);

	useEffect(() => {
		if (theme === 'laundro') {
			setProfileAvatar(avatar);
		}
	}, [theme]);

	const steps = [
		{
			title: 'RM Configuration',
			content: <RmForm operatorId={operatorId} data={data} setData={setData} setCurrent={setCurrent} />,
		},
		{
			title: 'Create Outlet',
			content: (
				<OutletForm
					operatorId={operatorId}
					data={data}
					setData={setData}
					setCurrent={setCurrent}
					setOutletCurrent={setOutletCurrent}
				/>
			),
		},
		{
			title: 'Machine Details',
			content: (
				<MachineForm
					rm={rm}
					operatorId={operatorId}
					rmExist={rmExist}
					data={data}
					setData={setData}
					setCurrent={setCurrent}
					setOutletCurrent={setOutletCurrent}
				/>
			),
		},
	];

	const outletSteps = [
		{
			title: 'Create Outlet',
			content: (
				<OutletForm
					operatorId={operatorId}
					data={data}
					setData={setData}
					setCurrent={setCurrent}
					setOutletCurrent={setOutletCurrent}
				/>
			),
		},
		{
			title: 'Machine Details',
			content: (
				<MachineForm
					rm={rm}
					operatorId={operatorId}
					rmExist={rmExist}
					data={data}
					setData={setData}
					current={current}
					setCurrent={setCurrent}
					setOutletCurrent={setOutletCurrent}
				/>
			),
		},
	];

	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	const outletItems = outletSteps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	const updateOutletSetting = (outlet, outletName) => {
		setCurrentOutlet(outlet);
		const filterMachine = machineData.filter((e) => e.outlet === outletName);
		setMachines(filterMachine);
		setQR(false);
		setRmForm(false);
		setForm(false);
	};

	const machineQR = (outletName) => {
		const filterMachine = machineData.filter((e) => e.outlet === outletName);
		setQR(true);
		setMachines(filterMachine);
		setOutletName(outletName);
		// console.log(machineData);
	};

	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};
	// console.log('machineData', machineData);
	return (
		<div>
			{distributor ? (
				<div className='d-flex justify-content-end'>
					<Select
						style={{ width: '12rem' }}
						placeholder='Select Operator'
						onChange={handleChangeOperatorId}
						options={operatorsOptions}
					/>{' '}
				</div>
			) : null}
			<div className='user-profile'>
				<div style={{ marginTop: '3rem' }}>
					<img className='avatar' style={{ width: '110px', display: 'block' }} src={profileAvatar} alt='avatar' />
				</div>
				<div className='user-info'>
					<h4 className='info'>{operator && operator.data.username}</h4>
					<span className='info' style={{ color: 'grey' }}>
						{operator && operator.data.email}
					</span>
					<p className='info mb-4'>Laundro</p>
					<div className='outlet-stats'>
						<div className='text-center'>
							<span className='num'>{outlets ? outlets.length : 0}</span>
							<br />
							<small>Outlets</small>
						</div>
						<div className='text-center'>
							<span className='num'>{dryers ? dryers.length : 0}</span>
							<br />
							<small>Dryers</small>
						</div>
						<div className='text-center'>
							<span className='num'>{washers ? washers.length : 0}</span>
							<br />
							<small>Washers</small>
						</div>
						<div className='text-center'>
							<span className='num'>{vendings ? vendings.length : 0}</span>
							<br />
							<small>Vending</small>
						</div>
					</div>
					{rmExist && outlets && rmExist.length ? (
						<Button
							onClick={() => {
								setRmForm(!rmForm);
								if (form) setForm(false);
								setCurrentOutlet('');
								setQR(false);
							}}
							style={{ marginTop: '1rem' }}
							type='primary'
						>
							Add RM Config
						</Button>
					) : null}
				</div>

				<div className=' outlet-list'>
					<div style={{ padding: '3px 0px' }} className='card-head d-flex justify-content-between'>
						<h5 style={{ display: 'inline' }}>List of Outlets</h5>{' '}
						{rmExist && outlets && rmExist.length && outlets.length ? (
							<AppstoreAddOutlined
								onClick={() => {
									if (rmExist) setForm(!form);
									if (rmForm) setRmForm(false);
									setCurrentOutlet('');
									setQR(false);
								}}
								style={{
									fontSize: '30px',
									marginLeft: 'auto',
									cursor: 'pointer',
								}}
							/>
						) : null}
					</div>
					<div className='scrollbar-div' style={{ overflowY: 'scroll', height: '180px' }}>
						{outlets &&
							outlets.map((outlet, idx) => {
								return (
									<div key={idx} style={{ margin: '5px 0px' }}>
										<div className='d-flex justify-content-between box align-items-center'>
											<div className='d-flex align-items-center'>
												<img style={{ width: '38px', marginRight: '.3rem' }} src={store} alt='' />
												<div className='fw-bold'>{outlet.fullname}</div>
											</div>

											<div className='d-flex justify-content-between'>
												<div
													style={{ cursor: 'pointer' }}
													className='me-3'
													onClick={() => updateOutletSetting(outlet, outlet.name)}
												>
													<FormOutlined style={{ fontSize: '1.4rem' }} />
												</div>
												<Button
													onClick={() => {
														machineQR(outlet.name);
														setCurrentOutlet('');
														setForm(false);
														setRmForm(false);
													}}
													size='small'
												>
													QR
												</Button>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</div>
			{qr ? <QrCode machines={machines} outlet={outletName} /> : null}

			{rmForm ? (
				<RmForm setRmForm={setRmForm} operatorId={operatorId} data={data} setData={setData} setCurrent={setCurrent} />
			) : null}
			{form ? (
				<div>
					<Steps current={outletCurrent} items={outletItems}>
						<Step title='Create Outlet' current={0} />
						<Step title='Add Machine Details' current={1} />
					</Steps>
					<div className='steps-content'>{outletSteps[outletCurrent].content}</div>
				</div>
			) : null}

			{(!rmExist || !rmExist.length) && !outlets.length ? (
				<div style={{ padding: '1rem', paddingBottom: '2rem' }} className='steps-action card'>
					<Steps current={current} items={items}>
						<Step title='Create RM Config' current={0} />
						<Step title='Create Outlet' current={1} />
						<Step title='Add Machine Details' current={2} />
					</Steps>
					<div className='steps-content'>{steps[current].content}</div>
				</div>
			) : null}

			{rmExist && rmExist.length && !outlets.length ? (
				<div style={{ padding: '1rem', paddingBottom: '2rem' }} className='steps-action card'>
					<Steps current={outletCurrent} items={outletItems}>
						<Step title='Create Outlet' current={0} />
						<Step title='Add Machine Details' current={1} />
					</Steps>
					<div className='steps-content'>{outletSteps[outletCurrent].content}</div>
				</div>
			) : null}

			{currentOutlet ? (
				<UpdateOutletSetting
					operatorId={operatorId}
					currentOutlet={currentOutlet}
					setCurrentOutlet={setCurrentOutlet}
					setUpdateSuccess={setUpdateSuccess}
					machines={machines}
				/>
			) : null}
		</div>
	);
};

export default UserSetting;
