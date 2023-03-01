import { Bar } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { Empty } from "antd";

export default function SalesColumn({ billAnnual }) {

  const [data, setData] = useState([]);

  useEffect(() => {

    if (billAnnual) {
      const sortOder = [...billAnnual].sort((a, b) => {
        return b.amount - a.amount;
      }).map(each => {
        return {
          name: each.name.toUpperCase(),
          amount: Number(each.amount),
        }
      })
      setData(sortOder);
    }
  }, [billAnnual]);



  // console.log(billAnnual);

  const config = {
    data,
    xField: "amount",
    yField: "name",
    color: "#12cbde",
    yAxis: {
      label: {
        autoRotate: false,
      },
    },
    scrollbar: {
      type: "vertical",
    },
    legend: {
      position: "top-left",
    },
    barBackground: {
      style: {
        fill: "rgba(0,0,0,0.1)",
      },
    },
    interactions: [
      {
        type: "active-region",
        enable: false,
      },
    ],
  };
  return (
    <div>
      {data ? <Bar style={{ height: "400px" }} {...config} /> : <Empty />}{" "}
    </div>
  );
}
