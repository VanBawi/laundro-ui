import { Table, Empty } from 'antd';
import React, { useState, useEffect } from 'react';
const { Column } = Table;

export default function MonthlyOutletTable({ outletMonth }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		let data = [];
		if (outletMonth) {
			for (let i = 0; i < outletMonth.length; i++) {
				data.push({
					name: outletMonth[i].name.toUpperCase(),
					coin: outletMonth[i].coin,
					epay: outletMonth[i].epay,
					total: outletMonth[i].total,
				});
			}
			setData(data);
		}
	}, [outletMonth]);

	// console.log('outletMonth', outletMonth);

	return (
		<div>
			{data ? (
				<Table dataSource={data} scroll={{ x: 800 }}>
					<Column title='Outlet' dataIndex='name' key='name' />
					<Column title='Coin' dataIndex='coin' key='coin' />
					<Column title='Epay' dataIndex='epay' key='epay' />
					<Column title='Total' key='total' dataIndex='total' />
				</Table>
			) : (
				<Empty />
			)}
		</div>
	);
}
