import { Button, Modal, Checkbox, Input } from 'antd';
import React, { useState } from 'react';
import laundry from '../../../images/others/laundry.png';
const ResetRefillModal = ({ isModalOpen, handleOk, handleCancel, modalName, outletName }) => {
	// washer
	const [amount, setAmount] = useState(0);

	const [types, setTypes] = useState({
		Reset: true,
		Refill: false,
	});

	return (
		<div>
			<Modal
				closable={false}
				title={`${modalName} token for: ${outletName} `}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={modalName}
				cancelText='Cancel'
				width={500}

			// style={{ background: 'linear-gradient(120deg, #6a4ee1 0%, #05bdd7 100%)', height: '100%', width: '100%' }}
			>
				{types.Reset ? (
					<div className='border py-4'>
						<div className='text-center'>
							<img src={laundry} alt='laundry' />
							<div>Current amount: 0</div>
						</div>
						<div className='d-flex flex-wrap justify-content-around  px-2 py-3 mt-3'>
							<Input.Group style={{ width: '180px' }}>
								<label htmlFor=''>Title</label>
								<Input type='text' name={'Weight'} disabled value={outletName} />
							</Input.Group>
							<Input.Group style={{ width: '180px' }} className=''>
								<label htmlFor=''>Amount</label>
								<Input type='number' name={'amount'} min={0} value={amount} onChange={(e) => setAmount(e.target.value)} />
							</Input.Group>
						</div>
					</div>
				) : null}

				{types.Refill ? (
					<div className='border py-4'>
						<div className='text-center'>
							<img src={laundry} alt='laundry' />
							<div>Current amount: 0</div>
						</div>
						<div className='d-flex flex-wrap justify-content-around  px-2 py-3 mt-3'>
							<Input.Group style={{ width: '180px' }}>
								<label htmlFor=''>Title</label>
								<Input type='text' name={'Weight'} disabled value={outletName} />
							</Input.Group>
							<Input.Group style={{ width: '180px' }} className=''>
								<label htmlFor=''>Amount</label>
								<Input type='number' name={'amount'} min={0} value={amount} onChange={(e) => setAmount(e.target.value)} />
							</Input.Group>
						</div>
					</div>
				) : null}
			</Modal>
		</div>
	);
};
export default ResetRefillModal;
