import { Table, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
const { Column } = Table;

const TopOutletTable = ({ topSalesData }) => {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (topSalesData) {
			let descending = topSalesData.sort((a, b) => {
				return b.total - a.total;
			});
			// console.log('api/report/sales/outlet')
			let top10 = descending.slice(0, 10);
			setData(top10);
		}
	}, [topSalesData]);

	// console.log('data', data)

	return (
		<>
			{data ? (
				<Table style={{ marginBottom: '1.5rem' }} pagination={false} dataSource={data}>
					<Column title='Outlet' dataIndex='name' key='1' />
					<Column title='Epay' dataIndex='epay' key='2' />
					<Column title='Coin' dataIndex='coin' key='3' />
					<Column title='Total Sales' dataIndex='total' key='4' />
				</Table>
			) : (
				<Empty />
			)}
		</>
	);
};
export default TopOutletTable;
