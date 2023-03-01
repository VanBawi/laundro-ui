import React, { useState, useEffect } from "react";
import { DualAxes } from "@ant-design/plots";

const DualAxeMonthly = ({ monthlyUtilData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (monthlyUtilData) {
      setData(monthlyUtilData);
    }
  }, [monthlyUtilData]);

  // console.log('monthlyUtilData', monthlyUtilData)

  const config = {
    data: [data, data],
    xField: "month",
    yField: ["dryer", "washer"],
    geometryOptions: [
      {
        geometry: "line",
        color: "#5B8FF9",
      },
      {
        geometry: "line",
        color: "#5AD8A6",
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default DualAxeMonthly;
