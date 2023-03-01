import { Table } from "antd";
import React, { useState, useEffect } from "react";
const { Column } = Table;

export default function DailySalesTable({ daily }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (daily) {
      let newData = [];
      for (let i = 0; i < daily.length; i++) {
        newData.push({
          key: i.toString(),
          date: daily[i].date,
          coin: daily[i].coin && daily[i].coin.toString(),
          epay: daily[i].epay && daily[i].epay.toString(),
          total: daily[i].total && daily[i].total.toString(),
        });
      }
      setData(newData);
    }
  }, [daily]);

  return (
    <Table style={{ width: "100%" }} dataSource={data} scroll={{ x: 300 }}>
      <Column title="Date" dataIndex="date" key="1" />
      <Column title="Coin" dataIndex="coin" key="2" />
      <Column title="Epay" dataIndex="epay" key="3" />
      <Column title="Total" key="5" dataIndex="total" />
    </Table>
  );
}
