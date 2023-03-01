import { Bar } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { Empty } from "antd";

export default function SalesColumnMonth({ billMonth }) {

  const [data, setData] = useState([]);

  // console.log(billMonth);

  useEffect(() => {

    if (billMonth) {
      const sortOder = [...billMonth].sort((a, b) => {
        return b.amount - a.amount;
      }).map(each => {
        return {
          name: each.name.toUpperCase(),
          amount: Number(each.amount),
        }
      })
      setData(sortOder);
    }
  }, [billMonth]);
  // console.log('data', data)


  const config = {
    data,
    xField: "amount",
    yField: "name",
    seriesField: 'name',
    color: "#12cbde",
    legend: {
      position: 'top-left',
    },
  };
  return (
    <div>
      {data ? <Bar style={{ height: "400px" }} {...config} /> : <Empty />}{" "}
    </div>
  );
}
