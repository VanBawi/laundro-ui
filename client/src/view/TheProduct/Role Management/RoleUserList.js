import React, { useEffect, useState } from 'react';
import { Table, Skeleton, List, message, Button, Modal } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRoleList } from '../../../reducer/roleReducer';
import { assignRoleAction } from '../../../reducer/requestEndpoints';
import { getClients } from '../../../reducer/adminReducer';

const RoleUserList = () => {
	const location = useLocation();
	const dispatch = useDispatch();

	const { roleLists, loading, error } = useSelector((state) => state.roleReducer);
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		dispatch(getClients());
	}, [dispatch]);
	// console.log('clients', clients);

	const [allUsers, setAllUsers] = useState(
		location.state && location.state.length
			? location.state.map((user) => ({
					...user,
					level: user.level.toUpperCase(),
					verified: user.verified ? 'Verified' : 'Not Verified',
					active: user.active ? 'Activated' : 'Deactivated',
					action: (
						<div>
							<Button htmlType='button' type='primary' onClick={() => setSelected(user)}>
								Action
							</Button>
						</div>
					),
					key: user.id + user.level,
			  }))
			: []
	);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		dispatch(getRoleList());
	}, [dispatch]);

	const columns = [
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'User Name',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: 'Account Type',
			dataIndex: 'level',
			key: 'level',
		},
		{
			title: 'Account Role',
			dataIndex: 'role',
			key: 'role',
		},
		{
			title: 'Verified',
			dataIndex: 'verified',
			key: 'verified',
		},
		{
			title: 'Active',
			dataIndex: 'active',
			key: 'active',
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: 'Updated At',
			dataIndex: 'updatedAt',
			key: 'updatedAt',
		},
		{
			title: 'Action',
			dataIndex: 'action',
			key: 'action',
		},
	];

	const changeRole = async (roleId, user) => {
		const userId = user.id;
		const userRole = user.level;
		const sendBody = {
			userId,
			userRole,
			roleId,
		};

		try {
			const { data } = await assignRoleAction(sendBody, localStorage.getItem('laundro-v2-admin-token'));
			const newData = allUsers.map((user) => {
				if (user.id === data.data.id && user.level === data.data.level.toUpperCase()) {
					return {
						...user,
						role: data.data.role,
					};
				} else {
					return user;
				}
			});

			setAllUsers(newData);
			setSelected({
				...selected,
				role: data.data.role,
			});
		} catch (error) {
			alert(error.response.data.error.en);
		}
	};

	// console.log('allUsers', allUsers);

	return (
		<div>
			{loading ? (
				<Skeleton loading={loading} active>
					<List.Item.Meta />
				</Skeleton>
			) : (
				<>
					<Table dataSource={allUsers} columns={columns} bordered scroll={{ x: 500 }} />
				</>
			)}

			<Modal open={selected} centered footer={null} onCancel={() => setSelected(null)}>
				{selected ? (
					<div>
						<div>
							<p>User Name: {selected.username}</p>
							<p>Account Type: {selected.level}</p>
							<p>Role: {selected.role}</p>
						</div>

						<div style={{ marginTop: '20px' }}>
							<p>Actions</p>

							<p>Edit Role:</p>
							<div>
								{roleLists.map((role) => (
									<Button
										key={role.id}
										htmlType='button'
										type={role.title === selected.role ? 'primary' : 'secondary'}
										onClick={() => changeRole(role.id, selected)}
										className='me-2 mt-2'
									>
										{role.title}
									</Button>
								))}
							</div>

							<Button htmlType='button' type='danger' style={{ marginTop: '10px' }}>
								Deactivate
							</Button>
						</div>
					</div>
				) : null}
			</Modal>
		</div>
	);
};

export default RoleUserList;
