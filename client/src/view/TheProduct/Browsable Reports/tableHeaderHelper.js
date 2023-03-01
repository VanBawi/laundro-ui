export const browsableReportHeaders = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Run Time (minutes)',
		dataIndex: 'runtime',
		key: 'runtime',
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Coin',
		dataIndex: 'coin',
		key: 'coin',
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Epay',
		dataIndex: 'epay',
		key: 'epay',
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Manual',
		dataIndex: 'manual',
		key: 'manual',
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'Start Time',
		dataIndex: 'starttime',
		key: 'starttime',
		sortDirections: ['descend', 'ascend'],
	},
	{
		title: 'End Time',
		dataIndex: 'endtime',
		key: 'endtime',
		sortDirections: ['descend', 'ascend'],
	},
];

export const epaymentHeaders = [
	{
		label: 'Outlet Name',
		key: 'outletName',
	},
	{
		label: 'Name',
		key: 'machineName',
	},
	{
		label: 'Method',
		key: 'method',
	},
	{
		label: 'Amount',
		key: 'amount',
	},
	{
		label: 'Status',
		key: 'status',
	},
	{
		label: 'Date',
		key: 'date',
	},
	{
		label: 'Time',
		key: 'time',
	},
	{
		label: 'Transaction ID',
		key: 'transaction_id',
	},
];

export const manualPayHeaders = [
	{
		label: 'Outlet Name',
		key: 'outletName',
	},
	{
		label: 'Name',
		key: 'machineName',
	},
	{
		label: 'Amount',
		key: 'amount',
	},
	{
		label: 'Status',
		key: 'status',
	},
	{
		label: 'Remark',
		key: 'remark',
	},
	{
		label: 'Date',
		key: 'date',
	},
	{
		label: 'Payee Account',
		key: 'payee_id',
	},
];

export const sorterFunction = (a, b, key) => {
	if (/^-?\d*\.?\d+$/.test(a[key])) {
		return a[key] - b[key];
	} else if (a[key] === 'date') {
		return new Date(a[key]) - new Date(b[key]);
	} else {
		return a[key] ? a[key].localeCompare(b[key]) : a[key];
	}
};
