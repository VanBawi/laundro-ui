import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './roleManage.css';
import { message, Button } from 'antd';
import AddDistributorModal from './AddDistributorModal';
import { getClients } from '../../../reducer/adminReducer';
import AssignDistributorModal from './AssignDistributorModal';

const DistributorsDashboard = () => {
	const dispatch = useDispatch();
	let { clientId } = useParams();

	useEffect(() => {
		dispatch(getClients());
	}, [dispatch]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [distributors, setDistributors] = useState([]);
	const [clientsOptions, setClientOptions] = useState([]);
	const [distributor, setDistributor] = useState([]);

	const { clients, error } = useSelector((state) => state.adminReducer);

	useEffect(() => {
		if (clients && clients.length) {
			const allData = [];
			clients.forEach((each) => {
				allData.push({
					value: each.id,
					label: each.name,
				});
			});

			setClientOptions(allData);

			const distribute = clients.find((e) => e.id === clientId);
			// console.log('distribute', distribute);
			if (distribute) {
				setDistributors(distribute.distributors);
			}
		}
	}, [clients, clientId]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// Assign distributor Modal
	const [assignModalOpen, setAssignModalOpen] = useState(false);
	const showAssignModal = () => {
		setAssignModalOpen(true);
	};
	const handleAssignCancel = () => {
		setAssignModalOpen(false);
	};

	const fetchClients = () => {
		dispatch(getClients());
	};

	console.log('distributors', distributors);

	return (
		<>
			<AddDistributorModal
				setIsModalOpen={setIsModalOpen}
				isModalOpen={isModalOpen}
				handleOk={handleOk}
				handleCancel={handleCancel}
				clientsOptions={clientsOptions}
				fetchClients={fetchClients}
			/>

			<AssignDistributorModal
				isModalOpen={assignModalOpen}
				handleCancel={handleAssignCancel}
				distributor={distributor}
			/>

			<div className='d-flex justify-content-between align-items-center mb-3'>
				<h5 className='lead fw-bold'>Distributors</h5>

				<div>
					<button
						onClick={() => {
							showModal();
						}}
						className='btn btn-primary me-3'
					>
						Create Distributors
					</button>
				</div>
			</div>

			<div className='brand-list-container'>
				{distributors && distributors.length ? (
					distributors.map((each, i) => {
						return (
							<div key={i} className='brand-list-box me-4 mb-4'>
								<div
									className='px-2 text-capitalize d-flex flex-column justify-content-between'
									style={{ height: '9rem' }}
								>
									<div style={{ color: 'gray' }}>
										<h5
											className='text-center d-flex align-items-center justify-content-center'
											style={{ minHeight: '3rem', background: 'rgba(166, 206, 218, 0.1)' }}
										>
											{each.name}
										</h5>
										<div>
											<div className='card-text'>
												Active: <b>{each.active ? 'Active' : 'Inactive'} </b>{' '}
											</div>
											<div className='card-text'>
												Desc: <b>{each.description} </b>{' '}
											</div>
										</div>
									</div>
								</div>

								<div className='d-flex justify-content-between align-items-center mt-2'>
									<div>
										{/* <Button
											size={'small'}
											type='primary'
											onClick={() => {
												// setRolesData(role);
												// showEditModal();
											}}
										>
											Edit
										</Button> */}
										<Button
											size={'small'}
											type='primary'
											// className='mx-3'
											onClick={() => {
												setDistributor(each);
												showAssignModal();
											}}
										>
											Assign Operator
										</Button>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<h4>No distributors for this client.</h4>
				)}
			</div>
		</>
	);
};

export default DistributorsDashboard;
