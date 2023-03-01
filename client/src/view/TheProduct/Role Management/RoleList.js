import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, message } from 'antd';
import './roleManage.css';
import { MinusSquareTwoTone, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import AddRoleModal from './AddRoleModal';
import UpdateRoleModal from './UpdateRoleModal';
import { getRoleList } from '../../../reducer/roleReducer';

const RoleList = () => {
	const dispatch = useDispatch();

	useEffect(() => {}, [dispatch]);
	const { roleLists, error } = useSelector((state) => state.roleReducer);

	const [rolesData, setRolesData] = useState('');

	useEffect(() => {
		dispatch(getRoleList());
	}, [dispatch]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	// set pricing Modal
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

	// edit pricing Modal
	const [editModalOpen, setEditModalOpen] = useState(false);
	const showEditModal = () => {
		setEditModalOpen(true);
	};
	const handleEditOk = () => {
		setEditModalOpen(false);
	};
	const handleEditCancel = () => {
		setEditModalOpen(false);
	};

	// const filter = (inputValue, path) => path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);

	// 1. add search box
	// 2. check the filter search function
	// 3. make a list of created price list
	// 4. add one plus button at front

	function filterByValue(array, value) {
		return array.filter((data) => {
			return JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1;
		});
	}

	const confirm = (id) => {
		//remove the pricing
		// console.log('id', id)
		// dispatch(deletePricing(id))
	};

	// console.log('priceLists', priceLists);
	// console.log('outlets', outlets);
	// console.log('roleLists', roleLists);

	return (
		<div>
			{
				<div>
					{isModalOpen ? (
						<AddRoleModal
							isModalOpen={isModalOpen}
							setIsModalOpen={setIsModalOpen}
							handleOk={handleOk}
							handleCancel={handleCancel}
						/>
					) : null}

					<UpdateRoleModal
						rolesData={rolesData}
						isModalOpen={editModalOpen}
						handleOk={handleEditOk}
						handleCancel={handleEditCancel}
					/>

					<div className='role-list-container'>
						<div
							className='role-list-box d-flex justify-content-center align-items-center'
							style={{ background: '#eee' }}
							onClick={() => showModal()}
						>
							<div className='text-center' style={{ maxWidth: '300px' }}>
								<PlusOutlined style={{ fontSize: '30px', fontWeight: 'bold', color: '#999' }} />
								<div className='h6 mt-2'>Add Roles</div>
							</div>
						</div>
						{roleLists && roleLists.length
							? roleLists.map((role, idx) => {
									return (
										<div key={idx} className='role-list-box'>
											<div className='d-flex justify-content-between'>
												<h5 style={{ textTransform: 'capitalize' }}>{role.title}</h5>
												<div>
													<Popconfirm
														placement='topRight'
														title={'Are you sure to delete this pricing?'}
														onConfirm={() => confirm(role.id)}
														okText='Yes'
														cancelText='No'
													>
														<MinusSquareTwoTone twoToneColor='#eb2f96' />
													</Popconfirm>
												</div>
											</div>
											<div className=''>
												<div>
													<small> Description: {role.description}</small>
												</div>
												<div>
													<small> Created On: {moment(role.createdAt).format('DD/MM/YYYY')}</small>
												</div>
											</div>

											<div className='d-flex justify-content-between align-items-center mt-2'>
												{/* <div>
													<Button
														size={'small'}
														type='primary'
														onClick={() => {
															setRolesData(role);
															showEditModal();
														}}
													>
														Edit
													</Button>
												</div> */}
											</div>
										</div>
									);
							  })
							: null}
					</div>
				</div>
			}
		</div>
	);
};

export default RoleList;
