import { Modal, Input, Form, message } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UpdateRoleModal = ({ rolesData, isModalOpen, setIsModalOpen, handleCancel }) => {
	// const dispatch = useDispatch();

	const [form] = Form.useForm();

	const { error } = useSelector((state) => state.roleReducer);

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
		}
	}, [isModalOpen, form]);

	useEffect(() => {
		if (error && error.en) {
			message.error(error.en);
		}
	}, [error]);

	useEffect(() => {
		if (rolesData && form) {
			form.setFieldsValue({
				title: rolesData.title,
				description: rolesData.description,
			});
		}
	}, [rolesData, form]);

	const onFinish = (values) => {
		console.log('values', values);
		// dispatch(addMachineLog(''))
	};
	// console.log('form', form.getFieldValue('level'))
	// console.log('machineLoggings', machineLoggings)

	return (
		<>
			<Modal
				closable={true}
				title='Update Role Details'
				open={isModalOpen}
				onCancel={handleCancel}
				okText=''
				cancelText=''
				footer={null}
			>
				<Form name='add-new-role' onFinish={onFinish} layout='vertical' form={form}>
					<div className='card p-3'>
						<Form.Item
							name='title'
							label='Title'
							rules={[
								{
									required: true,
									message: 'Please input the title!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item name='description' label='Description'>
							<Input />
						</Form.Item>
					</div>

					{/* <Form.Item className='mt-4 d-flex justify-content-end'>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Save
            </Button>
          </Form.Item> */}
				</Form>
			</Modal>
		</>
	);
};
export default UpdateRoleModal;
