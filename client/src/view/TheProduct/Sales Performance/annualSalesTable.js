import { Table } from "antd";
import React, { useState, useEffect } from "react";
const { Column } = Table;

export default function AnnualSalesTable({ annual }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    if (annual) {
      setData(annual)
    }
  }, [annual])

  return (
    <Table dataSource={data} scroll={{ x: 300 }}>
      <Column title="Month" dataIndex="month" key="1" />
      <Column title="Total" key="2" dataIndex="total" />
    </Table>
  );
}
