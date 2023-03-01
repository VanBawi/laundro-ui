import { Button, Modal, Space, Input, Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePricing, getPriceList } from '../../../../reducer/priceSettingReducer';
import { MinusCircleOutlined } from '@ant-design/icons';
import { allOutlets } from '../../../../reducer/outletReducer';

const EditPricingModal = ({ pricingData, isModalOpen, handleOk, handleCancel, operatorId }) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [submit, setSubmit] = useState(false);

	const { priceUpdated } = useSelector((state) => state.pricing);

	useEffect(() => {
		if (pricingData && form) {
			if (pricingData.pricesets.length) {
				const washer = pricingData.pricesets.filter((e) => e.type === 'washer');
				const dryer = pricingData.pricesets.filter((e) => e.type === 'dryer');
				const vending = pricingData.pricesets.filter((e) => e.type === 'vending');

				const removeKgWash = washer.map((e, idx) => {
					return {
						...e,
						type: 'washer',
						weight: parseInt(e.weight),
						coldprice: e.coldprice,
						hotprice: e.hotprice,
						warmprice: e.warmprice,
					};
				});

				const removeKgDry = dryer.map((e, idx) => {
					return {
						...e,
						type: 'dryer',
						weight: parseInt(e.weight),
						runtime: e.runtime,
						minprice: e.minprice,
						maxprice: e.maxprice,
					};
				});
				// console.log('removeKgWash', removeKgWash)
				// console.log('removeKgDry', removeKgDry)
				// console.log('vending', vending)
				form.setFieldsValue({
					name: pricingData.name,
					description: pricingData.description,
					washers: removeKgWash,
					dryers: removeKgDry,
					vending: vending,
				});
			}
		}
	}, [pricingData, form]);

	const onFinish = (values) => {
		// console.log("Success:", values);
		let resBody = {
			name: values.name,
			description: values.description,
			pricesets: [],
			id: pricingData.id,
			operatorId,
		};
		if (values.washers) {
			values.washers.forEach((each) => {
				const body = {
					type: 'washer',
					id: each.id,
					weight: each.weight + 'kg',
					coldprice: each.coldprice,
					hotprice: each.hotprice,
					warmprice: each.warmprice,
				};
				resBody.pricesets.push(body);
			});
		}

		if (values.dryers) {
			values.dryers.forEach((each) => {
				const body = {
					type: 'dryer',
					id: each.id,
					weight: each.weight + 'kg',
					runtime: each.runtime,
					minprice: each.minprice,
					maxprice: each.maxprice,
				};
				resBody.pricesets.push(body);
			});
		}

		if (values.vending) {
			values.vending.forEach((each) => {
				const body = {
					id: each.id,
					type: 'vending',
					detegent: each.detegent,
					softener: each.softener,
					laundrybag: each.laundrybag,
					bleach: each.bleach,
					drysoftener: each.drysoftener,
				};
				resBody.pricesets.push(body);
			});
		}
		setSubmit(true);
		dispatch(updatePricing(resBody));
	};

	useEffect(() => {
		if (priceUpdated && submit) {
			handleCancel();
			message.success('Price details updated.');
			form.resetFields();
			setTimeout(() => {
				dispatch(getPriceList(operatorId));
				if (operatorId) {
					dispatch(allOutlets(operatorId));
				} else {
					dispatch(allOutlets());
				}
			}, 1000);
		}
	}, [priceUpdated, submit]);
	// console.log('washerList', washerList)
	// console.log('dryerList', dryerList)

	return (
		<>
			<Modal
				closable={true}
				title='Pricing Details'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={() => handleCancel()}
				footer={''}
			>
				<Form name='normal_login' onFinish={onFinish} layout='vertical' form={form}>
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

					<div className='mt-3 h6'>Dryer </div>
					<Form.List name='dryers'>
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
					<Form.Item className='mt-3 d-flex justify-content-end'>
						<Button size='large' type='primary' htmlType='submit' className='login-form-button'>
							Save
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};
export default EditPricingModal;
