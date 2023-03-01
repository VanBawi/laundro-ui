import React, { useState, useEffect } from 'react';
import { Cascader, Switch, Tabs, Modal, Form, Input, Button, Empty, message, Select } from 'antd';
import '../Sales Performance/salesperformance.css';
import './remoteactivation.css';
import washerColorful from '../../../images/washing-machine.png';
import dryingMachine from '../../../images/drying-machine.png';
import vendingMachine from '../../../images/icons8-vending-machine-96.png';
import { useDispatch, useSelector } from 'react-redux';
import { remoteMachine, remoteActivate, machineMonitor, stopWasherMachine } from '../../../reducer/remoteReducer';
import { allOutlets } from '../../../reducer/outletReducer';
import io from 'socket.io-client';
import { fetchOperators } from '../../../reducer/userReducer';
import { urlPicker, localhost } from '../../../reducer/requestEndpoints';

const RemoteActivation = () => {
	const { machineData, paid, monitor, loading, error, stop, stopLoading } = useSelector((state) => state.remote);
	const { outlets } = useSelector((state) => state.outlets);
	const dispatch = useDispatch();
	const [allMachines, setAllMachines] = useState([]);

	const [machineName, setMachineName] = useState('');
	const [machineWeight, setMachineWeight] = useState('');
	const [machineStatus, setMachineStatus] = useState('');
	const [machineMode, setMachineMode] = useState('');
	const [machines, setMachines] = useState([]);
	const [options, setOptions] = useState([]);
	const [washer, setWasher] = useState(false);
	const [dryer, setDryer] = useState(false);
	const [vending, setVending] = useState(false);
	const [selectedOutlet, setSelectedOutlet] = useState('');

	const [submit, setSubmit] = useState(false);
	const [startMonitor, setStartMonitor] = useState(false);
	const [currentMachine, setCurrentMachine] = useState('');
	const [operatorsOptions, setOperatorsOptions] = useState([]);
	const [operatorId, setOperatorId] = useState('');

	const { distributor, operator, staff, operators } = useSelector((state) => state.user);

	// console.log('paid', paid)
	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		if (machineData) {
			setAllMachines(machineData);
		}
	}, [machineData]);

	useEffect(() => {
		if (allMachines) {
			if (selectedOutlet) {
				const filterMachine1 = allMachines.filter((e) => e.outlet.toLowerCase() === selectedOutlet.toLowerCase());
				setMachines(filterMachine1);
			}
		}
	}, [allMachines, selectedOutlet]);

	const setFalseType = () => {
		setWasher(false);
		setDryer(false);
		setVending(false);
		setSubmit(false);
	};

	useEffect(() => {
		if (paid && submit) {
			setFalseType();
			setTimeout(() => {
				message.success(paid);
			}, 1000);
		}
	}, [paid, submit]);

	useEffect(() => {
		if (monitor && submit) {
			setFalseType();
			setTimeout(() => {
				message.success(monitor);
			}, 1000);
		}
	}, [monitor, submit]);

	useEffect(() => {
		if (stop && submit) {
			setFalseType();
			setTimeout(() => {
				message.success(stop);
			}, 1000);
		}
	}, [stop, submit]);

	// console.log('outlets', outlets);

	useEffect(() => {
		if (operator || staff) {
			// console.log('hit remoteMachine, all outlets');
			dispatch(remoteMachine());
			dispatch(allOutlets());
			// console.log('staff', staff);

			// todo staff get operatorId
			if (operator && operator.data.id) {
				const socket = io({
					auth: { operatorId: operator.data.id },
				});

				socket.on('updateMachines', (data) => {
					if (data.length) {
						setAllMachines(data);
					}
				});
				// if (localhost) {
				// 	const socket = io({
				// 		auth: { operatorId: operator.data.id },
				// 	});

				// 	socket.on('updateMachines', (data) => {
				// 		if (data.length) {
				// 			setAllMachines(data);
				// 		}
				// 	});
				// } else {
				// 	const socket = io(urlPicker, {
				// 		auth: { operatorId: operator.data.id },
				// 	});

				// 	socket.on('updateMachines', (data) => {
				// 		if (data.length) {
				// 			setAllMachines(data);
				// 		}
				// 	});
				// }
			}
		}
	}, [operator, staff]);

	useEffect(() => {
		if (distributor) {
			dispatch(fetchOperators());
		}
	}, [dispatch, distributor]);

	// console.log('monitor', monitor);

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
		// console.log('filter here');
		if (operatorId) {
			// console.log('filter operator', operatorId);
			dispatch(remoteMachine(operatorId));
			dispatch(allOutlets(operatorId));

			if (operatorId) {
				// console.log("useEffect");
				const socket = io({
					auth: { operatorId: operatorId },
				});

				socket.on('updateMachines', (data) => {
					if (data.length) {
						setAllMachines(data);
					}
				});
			}
		}
	}, [dispatch, operatorId]);

	useEffect(() => {
		let optionsObj = [];
		if (outlets) {
			for (let i = 0; i < outlets.length; i++) {
				optionsObj.push({
					value: outlets[i].fullname,
					label: outlets[i].fullname,
				});
			}
			if (optionsObj.length) {
				setSelectedOutlet(optionsObj[0].value);
			}
			setOptions(optionsObj);
		}
	}, [outlets]);

	useEffect(() => {
		if (outlets.length && allMachines) {
			const filterMachine = allMachines.filter((e) => e.outlet.toLowerCase() === outlets[0].name.toLowerCase());

			if (selectedOutlet) {
				const filterMachine1 = allMachines.filter((e) => e.outlet.toLowerCase() === selectedOutlet.toLowerCase());
				setMachines(filterMachine1);
			} else {
				setMachines(filterMachine);
			}
		}
	}, [outlets, allMachines]);

	const onChangeOutlet = (value, selectedOptions) => {
		// console.log('value', value);
		// console.log('allMachines', allMachines);
		setSelectedOutlet(value[0]);
		if (allMachines) {
			const filterMachine = allMachines.filter((e) => e.outlet.toLowerCase() === value[0].toLowerCase());
			setMachines(filterMachine);
		}
	};

	const filter = (inputValue, path) =>
		path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

	const payNow = (values) => {
		setSubmit(true);
		if (loading) return;

		if (currentMachine && currentMachine.specialCheck && currentMachine.door_status !== 'Close') {
			return message.error('Door must be closed before remote activation');
		}

		dispatch(
			remoteActivate({
				operatorId,
				machineId: machineName.toLowerCase(),
				remark: values.remark,
				amount: values.amount,
			})
		);
	};

	const machineMonitoring = (check) => {
		// console.log('check', check);
		setSubmit(true);
		dispatch(
			machineMonitor({
				operatorId,
				machineId: machineName.toLowerCase(),
				check: check,
			})
		);
	};

	function washerModal(name, weight, active, locked, check, washerDa) {
		// console.log(name, weight, active, locked, check);
		setWasher(!washer);
		setMachineName(name);
		setMachineWeight(weight);
		setStartMonitor(check);
		if (active) setMachineStatus('Online');
		else setMachineStatus('Offline');
		if (locked) setMachineMode('Running');
		else setMachineMode('Idle');
		setCurrentMachine(washerDa);
	}

	function dryersModal(name, weight, active, locked, check) {
		setDryer(!dryer);
		setMachineName(name);
		setMachineWeight(weight);
		setStartMonitor(check);
		if (active) setMachineStatus('Online');
		else setMachineStatus('Offline');
		if (locked) setMachineMode('Running');
		else setMachineMode('Idle');
		setCurrentMachine('');
	}

	function vendingModal(name) {
		setVending(!vending);
		setMachineName(name);
		setCurrentMachine('');
	}

	const handleChangeOperatorId = (value, string) => {
		setOperatorId(value);
	};

	const stopWasher = () => {
		// call api stop function
		// message.error('cannot stop operation');
		setSubmit(true);
		dispatch(stopWasherMachine({ id: currentMachine.id }));
	};

	// console.log('stop', stop);
	// console.log('currentMachine', currentMachine);

	return (
		<div>
			Remote Activation / Machine Monitoring
			<div className='card' style={{ padding: '1rem' }}>
				<div>
					{distributor ? (
						<Select
							style={{ width: '12rem', marginRight: '1rem' }}
							value={operatorId ? operatorsOptions.find((e) => e.value === operatorId).label : 'No Operator'}
							onChange={handleChangeOperatorId}
							options={operatorsOptions}
						/>
					) : null}
					<Cascader
						options={options}
						onChange={onChangeOutlet}
						placeholder='Select Outlet'
						showSearch={{
							filter,
						}}
					/>
				</div>

				<div className='flex-container-ra mt-2'>
					{washer || dryer || vending ? (
						<Modal
							centered
							open={washer || dryer || vending}
							okButtonProps={{ style: { display: 'none' } }}
							onCancel={() => setWasher(false) || setDryer(false) || setVending(false)}
							cancelText='Cancel'
						>
							<Tabs>
								<Tabs.TabPane tab='Activation' key='item-1'>
									<div className='card py-4'>
										{washer || dryer ? (
											<img className='image-box' src={washer ? washerColorful : dryingMachine} alt='' />
										) : (
											<img
												style={{
													width: '100px',
													display: 'block',
													margin: '0 auto',
												}}
												src={vendingMachine}
												alt=''
											/>
										)}
										<div className='my-2 d-flex justify-content-center align-items-center'>
											<h2
												style={{
													display: 'inline',
													textAlign: 'center',
													padding: '1rem',
												}}
											>
												{machineName}
											</h2>
											{!vending ? <span className='machine-green'>{machineWeight}</span> : ''}
										</div>
										<div
											style={{ width: '35%', margin: '0 auto' }}
											className='my-1 d-flex justify-content-evenly align-items-center'
										>
											<span className={machineStatus === 'Online' ? 'machine-green' : 'machine-red'}>
												{machineStatus}
											</span>
											<span className={machineMode === 'Running' ? 'machine-green' : 'machine-yellow'}>
												{machineMode}
											</span>
										</div>
										<Form onFinish={payNow} className='mt-5 text-center'>
											<Form.Item
												name='amount'
												rules={[
													{
														required: true,
														message: 'Please input your amount!',
													},
												]}
											>
												<Input className='input-box-style' placeholder='Amount' type='number' />
											</Form.Item>
											<Form.Item
												name='remark'
												rules={[
													{
														required: true,
														message: 'Please input your remark!',
													},
												]}
												className='py-2'
											>
												<Input className='input-box-style' placeholder='Remark' />
											</Form.Item>

											<div className='d-flex justify-content-around mx-3'>
												<Button type='primary' htmlType='submit' className='pay-now-btn'>
													{loading ? 'Loading...' : 'Pay'}
												</Button>

												{currentMachine && currentMachine.specialCheck ? (
													<Button type='primary' onClick={() => stopWasher()} className='stop-now-btn'>
														{stopLoading ? 'Loading...' : 'Stop'}
													</Button>
												) : null}
											</div>
										</Form>
									</div>
								</Tabs.TabPane>
								<Tabs.TabPane tab='Monitoring' key='item-2'>
									<div className='py-5 card'>
										{washer || dryer ? (
											<img className='image-box' src={washer ? washerColorful : dryingMachine} alt='' />
										) : (
											<img className='image-box' src={vendingMachine} alt='' />
										)}
										<h2
											style={{
												display: 'block',
												textAlign: 'center',
												padding: '1rem',
												marginTop: '.5rem',
											}}
										>
											{machineName}
										</h2>

										<div className='d-flex justify-content-center align-items-center'>
											<span
												style={{
													fontSize: '1.5rem',
													marginRight: '.75rem',
												}}
											>
												Stop
											</span>
											<Switch
												onChange={() => machineMonitoring(startMonitor ? false : true)}
												defaultChecked={startMonitor ? true : false}
											/>
											<span
												style={{
													fontSize: '1.5rem',
													marginLeft: '.75rem',
												}}
											>
												Start
											</span>
										</div>
									</div>
								</Tabs.TabPane>
							</Tabs>
						</Modal>
					) : (
						''
					)}
					<div className='card'>
						<div className='border-bottom pt-2 pb-1 ps-3'>
							<h5>Washer</h5>
						</div>
						<div className='scrollbar-div' style={{ overflowY: 'auto', height: '350px' }}>
							{machines && machines.length ? (
								machines
									.filter((e) => e.machine_type === 'washer')
									.map((washer, idx) => {
										return (
											<div key={idx} style={{ cursor: 'pointer' }}>
												<div
													onClick={() => {
														washerModal(
															washer.displayname || washer.name,
															washer.machine_weight,
															washer.active,
															washer.locked,
															washer.check,
															washer
														);
													}}
													className='d-flex box justify-content-between'
												>
													<div className='d-flex align-items-center'>
														<div>
															<img className='image-contain' src={washerColorful} alt='' />
														</div>

														<div>
															<span className='me-2' id='title'>
																{washer.displayname || washer.name}
															</span>
															<span className={washer.active ? 'machine-green me-2 p-1' : 'machine-red me-2 p-1'}>
																<small> {washer.active ? 'Online' : 'Offline'}</small>
															</span>
															<span className={washer.locked ? 'machine-green p-1' : 'machine-yellow p-1'}>
																<small>{washer.locked ? 'Running' : 'Idle'} </small>
															</span>
															<br />
															<span style={{ fontSize: '14px', color: 'grey' }}>
																{washer.locked ? `Start At: ${washer.start_time}` : `End At: ${washer.done_time}`}
															</span>
														</div>
													</div>

													<div className='text-center'>
														<div style={{ fontSize: '0.8rem' }} className='current-coin'>
															{washer.current_coin}
														</div>
														<div style={{ color: washer.check ? 'green' : 'gray' }}>{washer.check ? 'On' : 'Off'}</div>
													</div>
												</div>
											</div>
										);
									})
							) : (
								<Empty />
							)}
						</div>
					</div>
					<div className='card'>
						<div className='border-bottom pt-2 pb-1 ps-3'>
							<h5>Dryer</h5>
						</div>
						<div className='scrollbar-div' style={{ overflowY: 'auto', height: '350px' }}>
							{machines && machines.length ? (
								machines
									.filter((e) => e.machine_type === 'dryer')
									.map((dryer, idx) => {
										return (
											<div key={idx}>
												<div
													onClick={() => {
														dryersModal(
															dryer.displayname || dryer.name,
															dryer.machine_weight,
															dryer.active,
															dryer.locked,
															dryer.check
														);
													}}
													className='d-flex box justify-content-between'
												>
													<div className='d-flex align-items-center'>
														<div>
															<img className='image-contain' src={dryingMachine} alt='' />
														</div>

														<div>
															<span className='me-2' id='title'>
																{dryer.displayname || dryer.name}
															</span>
															<span className={dryer.active ? 'machine-green me-2 p-1' : 'machine-red me-2 p-1'}>
																<small> {dryer.active ? 'Online' : 'Offline'} </small>
															</span>
															<span className={dryer.locked ? 'machine-green p-1' : 'machine-yellow p-1'}>
																<small>{dryer.locked ? 'Running' : 'Idle'} </small>
															</span>
															<br />
															<span style={{ fontSize: '14px', color: 'grey' }}>
																{dryer.locked ? `Start At: ${dryer.start_time}` : `End At: ${dryer.done_time}`}
															</span>
														</div>
													</div>

													<div className='text-center'>
														<div style={{ fontSize: '0.8rem' }} className='current-coin'>
															{dryer.current_coin}
														</div>
														<div style={{ color: dryer.check ? 'green' : 'gray' }}>{dryer.check ? 'On' : 'Off'}</div>
													</div>
												</div>
											</div>
										);
									})
							) : (
								<Empty />
							)}
						</div>
					</div>
					<div className='card'>
						<div className='border-bottom pt-2 pb-1 ps-3'>
							<h5>Vending</h5>
						</div>
						<div className='scrollbar-div' style={{ overflowY: 'auto', height: '350px' }}>
							{machines && machines.length ? (
								machines
									.filter((e) => e.machine_type === 'vending')
									.map((vending, idx) => {
										return (
											// <div>
											<div key={idx} style={{ margin: '15px 25px' }}>
												<div
													onClick={() => {
														vendingModal(vending.displayname || vending.name);
													}}
													className='d-flex box'
												>
													<img className='image-contain' src={vendingMachine} alt='' />
													<div>
														<span id='title'>{vending.displayname || vending.name}</span>
														<br />
														<span style={{ fontSize: '14px', color: 'grey' }}></span>
													</div>
												</div>
											</div>
										);
									})
							) : (
								<Empty />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RemoteActivation;
