import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Checkbox, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRM } from '../../../reducer/userReducer';
import './profile.css';
import '../../TheProduct/Sales Performance/salesperformance.css';

const OutletForm = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const { data, setData, setCurrent, setOutletCurrent, operatorId } = props;
	const { rmExist } = useSelector((state) => state.user);
	const [tempData, setTempData] = useState({});
	const [submit, setSubmit] = useState(false);
	const [fiftyCent, setFiftyCent] = useState(false);
	const [checkRes, setCheckRes] = useState(false);
	const [cloud, setCloud] = useState(false);
	const [tenPulse, setTenPulse] = useState(false);
	const [options, setOptions] = useState([]);

	// console.log(outletName);

	useEffect(() => {
		if (operatorId) {
			dispatch(fetchRM(operatorId));
		} else {
			dispatch(fetchRM());
		}
	}, [dispatch, operatorId]);

	const onFinish = (values) => {
		setSubmit(true);
		// console.log(values);
		let outletObj = {
			...values,
			fiftycent: fiftyCent,
			cloud: cloud,
			tenpulse: tenPulse,
			check_res: checkRes,
		};
		setTempData(outletObj);
	};

	useEffect(() => {
		if (submit) {
			setData({
				...data,
				outletData: tempData,
			});
			// console.log('tempData', tempData);
			setCurrent(2);
			setOutletCurrent(1);
		}

		if (data && data.outletData) {
			const { fiftycent, check_res, cloud, tenpulse } = data.outletData;
			setFiftyCent(fiftycent);
			setCheckRes(check_res);
			setCloud(cloud);
			setTenPulse(tenpulse);
		}
	}, [tempData, submit, data]);

	// console.log('data', data);

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

	// console.log(rmExist);
	function setPrefix(value) {
		// console.log('value: ' + value);
		form.setFieldsValue({
			fullname: value.toLowerCase(),
		});
	}

	return (
		<div className='card'>
			<Form
				form={form}
				onFinish={onFinish}
				name='normal_login'
				className='p-4'
				layout='vertical'
				initialValues={data.outletData}
			>
				<div className='d-md-flex justify-content-between'>
					<Form.Item
						style={{ width: '100%' }}
						className='me-2'
						name='name'
						label='Outlet Name'
						rules={[
							{
								required: true,
								message: 'Please input your Outlet Name!',
							},
						]}
					>
						<Input onChange={(e) => setPrefix(e.target.value)} style={{ padding: '.5rem' }} />
					</Form.Item>
					<Form.Item
						style={{ width: '100%' }}
						className='me-2'
						name='fullname'
						label='Outlet Prefix'
						rules={[
							{
								required: true,
								message: 'Please input your Outlet Prefix!',
							},
						]}
					>
						<Input
							// disabled
							style={{ padding: '.5rem' }}
						/>
					</Form.Item>
					<Form.Item
						style={{ width: '100%' }}
						className='me-2'
						name='brand'
						label='Brand'
						rules={[
							{
								required: true,
								message: 'Please input your brand!',
							},
						]}
					>
						<Input style={{ padding: '.5rem' }} />
					</Form.Item>
					<Form.Item
						style={{ width: '100%' }}
						name='url'
						label='Url'
						rules={[
							{
								required: true,
								message: 'Please input your Url!',
							},
						]}
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
				<div style={{ margin: '1rem 0' }} className='d-md-flex justify-content-between'>
					<Form.Item
						style={{ width: '100%' }}
						className='me-2'
						name='city'
						label='City'
						rules={[
							{
								required: true,
								message: 'Please confirm your City!',
							},
						]}
					>
						<Input style={{ padding: '.5rem' }} />
					</Form.Item>
					<Form.Item
						style={{ width: '100%' }}
						className='me-2'
						name='state'
						label='State'
						rules={[
							{
								required: true,
								message: 'Please confirm your State!',
							},
						]}
					>
						<Input style={{ padding: '.5rem' }} />
					</Form.Item>
					<Form.Item
						style={{ width: '100%' }}
						name='postcode'
						label='Postcode'
						rules={[
							{
								required: true,
								message: 'Please confirm your Postcode!',
							},
						]}
					>
						<Input style={{ padding: '.5rem' }} />
					</Form.Item>
				</div>
				<div style={{ margin: '1rem 0' }} className='d-flex justify-content-between'>
					<Form.Item
						style={{
							width: '50%',
						}}
						className='me-2'
						name='rmstoreid'
						label='Rm Store ID'
						rules={[
							{
								required: true,
								message: 'Please confirm your Rm Store ID!',
							},
						]}
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
				<div style={{ margin: '1rem 0' }} className='d-md-flex justify-content-evenly'>
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
						<Input min='0' type='number' />
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
						<Input min='0' type='number' />
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
						Check Response
					</Checkbox>
				</div>
				<div className='mt-3'>
					<Form.Item
						style={{
							display: 'inline-block',
							width: '180px',
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
		</div>
	);
};

export default OutletForm;
