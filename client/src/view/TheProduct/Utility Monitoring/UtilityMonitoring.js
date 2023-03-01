import React from 'react';
import { Modal } from 'antd';
import '../Sales Performance/salesperformance.css';
import './utilitymonitoring.css';
import { useNavigate, useLocation } from 'react-router-dom';

const UtilityMonitoring = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const stateData = location.state;

	return (
		<div>
			<Modal
				closable={true}
				centered
				open={true}
				mask={true}
				onCancel={() => {
					navigate('/mainDashboard', { state: stateData });
				}}
				bodyStyle={{ height: '100px' }}
				cancelButtonProps={{ style: { display: 'none' } }}
				okText={'Take me to dashboard'}
				onOk={() => {
					navigate('/mainDashboard', { state: stateData });
				}}
				width={500}
			>
				<div>Theres currently no data for Utility Monitoring</div>
			</Modal>
			Utility Monitoring
			{/* <div>
        <Cascader
          defaultValue={["petaling jaya", "ss2"]}
          style={{ margin: "1rem .3rem" }}
          options={options}
          onChange={onChange}
          placeholder="Select Outlet"
          showSearch={{
            filter,
          }}
          onSearch={(value) => console.log(value)}
        />
        <Cascader
          defaultValue={["2022"]}
          style={{ margin: "1rem .3rem" }}
          options={selectYear}
          onChange={onChange}
          placeholder="Select Year"
          showSearch={{
            filter,
          }}
          onSearch={(value) => console.log(value)}
        />
        <Cascader
          defaultValue={["Jan"]}
          style={{ margin: "1rem .3rem" }}
          options={selectMonth}
          onChange={onChange}
          placeholder="Select Month"
          showSearch={{
            filter,
          }}
          onSearch={(value) => console.log(value)}
        />
      </div>
      <div className="card">
        <h4 style={{ padding: "1.5rem" }}>
          Daily Detergent Level in {outlet} ({month})
        </h4>
        <div className="d-flex flex-container justify-content-around">
          <DetergentLvl className="level" />
          <DemoArea className="graph" />
        </div>
      </div>
      <div style={{ marginTop: "2rem" }} className="card">
        <h4 style={{ padding: "1.5rem" }}>
          Daily Softener Level in {outlet} ({month})
        </h4>
        <div className="d-flex flex-container justify-content-around">
          <SoftenerLvl className="level" />
          <DemoArea className="graph" />
        </div>
      </div> */}
		</div>
	);
};

export default UtilityMonitoring;
