import React, { useState, useEffect } from "react";
import { Bar } from "@ant-design/plots";

export default function TotalMachineRuntimeMonth({
  monthlyUtilData,
  setMachineData,
  machineData,
}) {
  const [data, setData] = useState([]);
  // console.log(monthUtil);

  useEffect(() => {
    if (monthlyUtilData) {
      let machine = [];

      for (let i = 0; i < monthlyUtilData.length; i++) {
        machine.push({
          name: monthlyUtilData[i].name.toUpperCase(),
          type: "Washer",
          value: monthlyUtilData[i].washer,
        });

        machine.push({
          name: monthlyUtilData[i].name.toUpperCase(),
          type: "Dryer",
          value: monthlyUtilData[i].dryer,
        });
      }
      setData(machine);
    }
  }, [monthlyUtilData]);

  // console.log("monthUtil", monthUtil);

  const config = {
    data,
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
  return <Bar {...config} />;
}
