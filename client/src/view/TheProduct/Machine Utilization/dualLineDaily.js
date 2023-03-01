import React, { useState, useEffect } from "react";
import { DualAxes } from "@ant-design/plots";
// import { allDailyUtil } from "../../../reducer/machineUtilReducer";
import { useDispatch, useSelector } from "react-redux";

const DualAxeDaily = ({ year, month, monthUtil }) => {
  const { utilDaily } = useSelector((state) => state.util);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (monthUtil) {
  //     dispatch(allDailyUtil(year, month));
  //   }
  // }, [monthUtil, year, month]);


  useEffect(() => {
    if (utilDaily) {
      setData(utilDaily);
    }
  }, [utilDaily]);
  // console.log('utilDaily', );

  const config = {
    data: [data, data],
    xField: "date",
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

export default DualAxeDaily;
