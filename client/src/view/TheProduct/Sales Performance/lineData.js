import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import { Empty } from "antd";

export default function TotalDailySales({ daily, toggleDaily }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (daily) {
      const data = [...daily].map(e => {
        return {
          ...e,
          total: Number(e.total)
        }
      })
      setData(data)
    }
  }, [daily])

  // console.log('daily', daily)

  const config = {
    data: data,
    xField: "date",
    yField: "total",
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "marker-active",
      },
    ],
  };

  return (
    <div>
      {data ? (
        <Line {...config} style={{ display: toggleDaily ? "none" : "block" }} />
      ) : (
        <Empty />
      )}{" "}
    </div>
  );
}
