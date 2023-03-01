import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/plots";
import { Empty } from "antd";

export default function TotalMachineRuntime({
  annualUtil,
  machineData,
  setMachineData,
}) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (annualUtil) {
      let machine = [];
      let descending = [...annualUtil].sort((a, b) => {
        return a.total - b.total;
      });
      for (let i = 0; i < descending.length; i++) {
        machine.push({
          name: descending[i].name.toUpperCase(),
          type: "Washer",
          value: descending[i].washer,
        });

        machine.push({
          name: descending[i].name.toUpperCase(),
          type: "Dryer",
          value: descending[i].dryer,
        });
      }
      setData(machine);
    }
  }, [annualUtil]);

  // console.log('annualUtil', annualUtil)

  const config = {
    data: data.reverse(),
    isStack: true,
    xField: "value",
    yField: "name",
    seriesField: "type",
    label: {
      position: "middle",

      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
    scrollbar: { type: "vertical" },
  };
  return <div>{data ? <Bar {...config} /> : <Empty />}</div>;
}
