import { Modal } from 'antd';
import React from 'react';
const ImagesGalleryModal = ({ imgs, isModalOpen, handleOk, handleCancel }) => {
	return (
		<>
			<Modal
				closable
				// centered
				title='Image Gallery'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				// okText='Save'
				// cancelText='Close'
				width={700}
			>
				<div className='d-flex flex-wrap'>
					{imgs.length
						? imgs.map((image, idx) => {
								return (
									<div key={idx} className='my-2 border'>
										{' '}
										<img src={image} alt='' style={{ objectFit: 'contain', width: '320px', height: '320px' }} />{' '}
									</div>
								);
						  })
						: ''}
				</div>
			</Modal>
		</>
	);
};
export default ImagesGalleryModal;
