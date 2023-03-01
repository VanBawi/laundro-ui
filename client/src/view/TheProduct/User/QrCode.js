import { Popover, Button } from 'antd';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect } from 'react';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import { Table } from 'antd';
import './profile.css';

const QrCode = ({ machines, outlet }) => {
	// console.log('machines', machines);

	const [qrCodes, setQrCodes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [allMachines, setAllMachines] = useState([]);

	const downloadQRCode = (fileName, idx) => {
		const svg = document.getElementById('QRCodeD' + idx);
		const svgData = new XMLSerializer().serializeToString(svg);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		const img = new Image();

		img.onload = async () => {
			canvas.width = 400;
			canvas.height = 400;

			ctx.fillStyle = '#fff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.drawImage(img, 25, 25, 350, 350);

			const pngFile = canvas.toDataURL('image/png');

			const image = await fetch(pngFile);
			const imageBlog = await image.blob();
			const imageURL = URL.createObjectURL(imageBlog);

			const link = document.createElement('a');
			link.href = imageURL;
			link.crossOrigin = '*';

			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		};

		img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
		// console.log('btoa(svgData)', btoa(svgData), img);
	};

	const getBase64Urls = () => {
		if (machines.length) {
			const imagesArr = [];
			setLoading(true);
			machines.forEach((machine, idx) => {
				const svg = document.getElementById('QRCodeD' + idx);

				const svgData = new XMLSerializer().serializeToString(svg);
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				const img = new Image();

				img.onload = async () => {
					canvas.width = 400;
					canvas.height = 400;

					ctx.fillStyle = '#fff';
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					ctx.drawImage(img, 25, 25, 350, 350);
					const pngFile = canvas.toDataURL('image/png');

					const image = await fetch(pngFile);
					const imageBlog = await image.blob();
					const imageURL = URL.createObjectURL(imageBlog);
					imagesArr.push({ name: machine.name, url: imageURL });
				};
				img.crossOrigin = 'Anonymous';
				img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
			});

			// console.log('imagesArr', imagesArr);
			setTimeout(() => {
				setLoading(false);
				setQrCodes(imagesArr);
			}, 3000);
		}
	};

	useEffect(() => {
		if (qrCodes.length) {
			handleDownloadAll();
			setQrCodes([]);
		}
	}, [qrCodes]);

	// console.log('qrCodes', qrCodes);

	// console.log('qrCodes', qrCodes.length);
	const handleDownloadAll = async () => {
		const zip = new JSZip();
		const zipFileName = `laundro-qrcodes.zip`;
		let fileCount = 0;

		for (let i = 0; i < qrCodes.length; i++) {
			const imageKeys = qrCodes[i] ? qrCodes[i].url : '';
			let imageExt = '.png';

			let photoName = `${qrCodes[i].name}${imageExt}`;

			JSZipUtils.getBinaryContent(
				imageKeys,
				// eslint-disable-next-line no-loop-func
				(err, photoData) => {
					if (err) {
						photoName = `file-missing-${i}`;
					}
					// console.log('photoData', photoData);

					zip.file(photoName, photoData, {
						binary: true,
						createFolders: true,
					});
					fileCount++;

					if (fileCount === qrCodes.length) {
						zip
							.generateAsync({ type: 'blob' })
							.then((content) => saveAs(content, zipFileName))
							.catch((err) => console.log(err));
					}
				}
			);
		}
	};
	// console.log('machines', machines);

	useEffect(() => {
		if (machines) {
			const tab1 = machines.map((each, idx) => {
				return {
					key: idx,
					machine: each.name,
					qrcode: (
						<Popover
							overlayInnerStyle={{
								padding: '0',
							}}
							content={<QRCodeSVG id='QRCode' height={200} width={200} value={each.qrcode} />}
						>
							<QRCodeSVG id={'QRCodeD' + idx} height={60} width={60} value={each.qrcode} />
						</Popover>
					),
					download: (
						<Button className='text-end' type='primary' onClick={() => downloadQRCode(each.name, idx)}>
							Download
						</Button>
					),
				};
			});
			setAllMachines(tab1);
		}
	}, [machines]);

	const columns = [
		{
			title: 'Machine',
			dataIndex: 'machine',
			key: 'machine',
		},
		{
			title: 'QrCode',
			dataIndex: 'qrcode',
			key: 'qrcode',
		},
		{
			title: 'Download',
			dataIndex: 'download',
			key: 'download',
		},
	];

	return (
		<div className='card p-3'>
			<h4>List of Devices - {outlet.toUpperCase()}</h4>
			<Table dataSource={allMachines} columns={columns} scroll={{ x: 500 }} />

			{/* <div>
				<Button type='primary' onClick={() => !loading && getBase64Urls()}>
					{loading ? 'Loading...' : 'Download All'}
				</Button>
			</div> */}
		</div>
	);
};

export default QrCode;
