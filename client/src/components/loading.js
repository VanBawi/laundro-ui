import React from "react";
import { Spin } from "antd";

const LoadingPage = () => {
  return (
    <div className="spinner">
      <div className="spinner-body">
        <Spin size="large" />
      </div>
    </div>
  );
};

export default LoadingPage;
