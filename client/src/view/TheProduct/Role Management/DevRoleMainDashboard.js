import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './roleManage.css';
import { Button, message } from 'antd';
import AddClientModal from './AddClientModal';
import AddUserRole from './AddUserRole';
import { getClients } from '../../../reducer/adminReducer';

const DevRoleMainDashboard = () => {
	const dispatch = useDispatch();

	const { error } = useSelector((state) => state.roleReducer);
	const { clients } = useSelector((state) => state.adminReducer);

	useEffect(() => {
		dispatch(getClients());
	}, [dispatch]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	// console.log('clients', clients);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const [userModalOpen, setUserModalOpen] = useState(false);
	const showModalUser = () => {
		setUserModalOpen(true);
	};

	const handleCancelUser = () => {
		setUserModalOpen(false);
	};

	return (
		<>
			{isModalOpen ? (
				<AddClientModal
					setIsModalOpen={setIsModalOpen}
					isModalOpen={isModalOpen}
					handleOk={handleOk}
					handleCancel={handleCancel}
				/>
			) : null}

			{userModalOpen ? (
				<AddUserRole setIsModalOpen={showModalUser} isModalOpen={userModalOpen} handleCancel={handleCancelUser} />
			) : null}

			<div className='d-flex justify-content-between align-items-center '>
				<h5 className='lead'>Roles Main Dashboard</h5>

				<div>
					<button
						onClick={() => {
							showModalUser();
						}}
						className='btn btn-primary me-2'
					>
						Create New User
					</button>

					<button
						onClick={() => {
							showModal();
						}}
						className='btn btn-primary'
					>
						Create New Client
					</button>
				</div>
			</div>

			<div className='brand-list-container mt-3'>
				{clients && clients.length
					? clients.map((each, i) => {
							return (
								<div key={i} className='brand-list-box me-4 mb-4'>
									<div
										className='px-2 text-capitalize d-flex flex-column justify-content-between'
										style={{ height: '13rem' }}
									>
										<Link to={`/distributors/${each.id}`} style={{ color: 'gray' }}>
											<h5
												className='text-center d-flex align-items-center justify-content-center'
												style={{ minHeight: '3rem', background: 'rgba(166, 206, 218, 0.1)' }}
											>
												{each.name}
											</h5>

											<div>
												<div className='card-text'>
													Distributors: <b> {each.distributors.length} </b>
												</div>
												<div className='card-text'>
													Loyalty Domain: <small> {each.loyalty_domain} </small>
												</div>
												<div className='card-text'>
													No of Users: <b> {each.users?.length} </b>
												</div>
												<div className='card-text'>
													Descriptions: <b> {each.description} </b>
												</div>
											</div>
										</Link>

										<div className='text-end'>
											<Link to={`/userList/${each.id}`} state={each.users}>
												<Button>User List</Button>
											</Link>
										</div>
									</div>
								</div>
							);
					  })
					: null}
			</div>
		</>
	);
};

export default DevRoleMainDashboard;
