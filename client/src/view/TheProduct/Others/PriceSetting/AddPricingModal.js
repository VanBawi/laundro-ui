import { Button, Modal, Space, Input, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPricing, getPriceList } from '../../../../reducer/priceSettingReducer';
import { MinusCircleOutlined } from '@ant-design/icons';

const AddPricingModal = ({ isModalOpen, handleOk, handleCancel, operatorId }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [submit, setSubmit] = useState(false);

	const { price } = useSelector((state) => state.pricing);

	useEffect(() => {
		if (isModalOpen) {
			form.resetFields();
		}
	}, [isModalOpen, form]);

	useEffect(() => {
		if (price && submit) {
			message.success('Successfully created.');
			handleOk();
			setTimeout(() => (operatorId ? dispatch(getPriceList(operatorId)) : dispatch(getPriceList())), 500);
			form.resetFields();
		}
	}, [price, submit]);

	// console.log('price', price);

	const onFinish = (values) => {
		// console.log("Success:", values);
		let resBody = {
			name: values.name,
			description: values.description,
			data: [],
			operatorId,
		};
		if (values.washers) {
			values.washers.forEach((each) => {
				const body = {
					type: 'washer',
					weight: each.weight + 'kg',
					coldprice: each.coldprice,
					hotprice: each.hotprice,
					warmprice: each.warmprice,
				};
				resBody.data.push(body);
			});
		}

		if (values.dryers) {
			values.dryers.forEach((each) => {
				const body = {
					type: 'dryer',
					weight: each.weight + 'kg',
					runtime: each.runtime,
					minprice: each.minprice,
					maxprice: each.maxprice,
				};
				resBody.data.push(body);
			});
		}

		if (values.vending) {
			values.vending.forEach((each) => {
				const data = {
					type: 'vending',
					detegent: each.detegent,
					softener: each.softener,
					laundrybag: each.laundrybag,
					bleach: each.bleach,
					drysoftener: each.drysoftener,
				};
				resBody.data.push(data);
			});
		}
		setSubmit(true);
		// console.log('resBody, data:', resBody)
		dispatch(addPricing(resBody));
	};
	// console.log('washerarr', washerArr)
	// console.log('form', form)
	return (
		<>
			<Modal
				title='Add Pricing'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={() => {
					handleCancel();
				}}
				footer={''}
			>
				<Form form={form} name='normal_login' onFinish={onFinish} layout='vertical'>
					<Form.Item
						name='name'
						label='Name'
						rules={[
							{
								required: true,
								message: 'Please input the name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='description'
						label='Description'
						rules={[
							{
								required: true,
								message: 'Please input your description!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<div className='mt-3 h6'>Washer </div>
					<Form.List name='washers'>
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
									<Space key={key} className='flex-wrap flex-md-nowrap'>
										<Form.Item
											{...restField}
											name={[name, 'weight']}
											label='Weight kg'
											rules={[
												{
													required: true,
													message: 'Input min value!',
												},
											]}
										>
											<Input type='number' step={0.5} min={0} />
										</Form.Item>
										<Form.Item
											{...restField}
											name={[name, 'coldprice']}
											label='Cold Price'
											rules={[
												{
													required: true,
													message: 'Input min value!',
												},
											]}
										>
											<Input type='number' step={0.5} min={0} />
										</Form.Item>
										<Form.Item
											{...restField}
											name={[name, 'warmprice']}
											label='Warm Price'
											rules={[
												{
													required: true,
													message: 'Input min value!',
												},
											]}
										>
											<Input type='number' step={0.5} min={0} />
										</Form.Item>

										<Form.Item
											{...restField}
											name={[name, 'hotprice']}
											label='Hot Price'
											rules={[
												{
													required: true,
													message: 'Input min value!',
												},
											]}
										>
											<Input type='number' step={0.5} min={0} />
										</Form.Item>

										<div className='mt-3'>
											{fields && fields.length ? (
												<MinusCircleOutlined style={{ color: 'red' }} onClick={() => remove(name)} />
											) : null}
										</div>
									</Space>
								))}
								<Form.Item>
									<Button type='dashed' onClick={() => add()} block>
										Add field
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
					<div className='border-top'>
						<div className='mt-3 h6'>Dryer </div>
						<Form.List name='dryers'>
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, ...restField }) => (
										<Space key={key} className='flex-wrap flex-md-nowrap'>
											<Form.Item
												{...restField}
												name={[name, 'weight']}
												label='Weight'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>

											<Form.Item
												{...restField}
												name={[name, 'runtime']}
												label='Run Time RM1'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'minprice']}
												label='Min Amount'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'maxprice']}
												label='Max Amount'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>
											<div className='mt-3'>
												{fields && fields.length ? (
													<MinusCircleOutlined style={{ color: 'red' }} onClick={() => remove(name)} />
												) : null}
											</div>
										</Space>
									))}
									<Form.Item>
										<Button type='dashed' onClick={() => add()} block>
											Add field
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
					</div>

					<div className='border-top'>
						<div className='mt-3 h6'>Vending </div>

						<Form.List name='vending'>
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, ...restField }) => (
										<Space key={key} className='flex-wrap align-items-center'>
											<Form.Item
												{...restField}
												name={[name, 'detegent']}
												label='Detergent'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>

											<Form.Item
												{...restField}
												name={[name, 'softener']}
												label='Softener'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'laundrybag']}
												label='Laundry Bag'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'bleach']}
												label='Bleach'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, 'drysoftener']}
												label='Dry Softener'
												rules={[
													{
														required: true,
														message: 'Input min value!',
													},
												]}
											>
												<Input type='number' step={0.5} min={0} />
											</Form.Item>
											<div className='mt-3'>
												{fields && fields.length === 1 ? (
													<MinusCircleOutlined style={{ color: 'red' }} onClick={() => remove(name)} />
												) : null}
											</div>
										</Space>
									))}
									{fields && fields.length < 1 ? (
										<Form.Item>
											<Button type='dashed' onClick={() => add()} block>
												Add field
											</Button>
										</Form.Item>
									) : null}
								</>
							)}
						</Form.List>
					</div>
					<Form.Item className='mt-3'>
						<Button size='large' type='primary' htmlType='submit' className='login-form-button'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default AddPricingModal;
