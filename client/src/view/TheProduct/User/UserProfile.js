import React, { useEffect } from 'react';
import { message } from 'antd';
// import { Button, Modal, Form, Input, message } from "antd";
// import avatar from "../../../images/avatars/thumb-13.jpg";
// import washerColorful from "../../../images/others/washer3.png";
import { allOutlets } from '../../../reducer/outletReducer';
// import { changePassword } from "../../../reducer/userReducer";
import { useDispatch, useSelector } from 'react-redux';
import { remoteMachine } from '../../../reducer/remoteReducer';
import './profile.css';
import '../../TheProduct/Sales Performance/salesperformance.css';

const UserProfile = () => {
	const dispatch = useDispatch();
	const { password } = useSelector((state) => state.user);
	// const { outlets } = useSelector((state) => state.outlets);
	const { machineData } = useSelector((state) => state.remote);
	// const [washers, setWashers] = useState(0);
	// const [dryers, setDryers] = useState(0);
	// const [vendings, setVendings] = useState(0);
	// const [modal, setModal] = useState(false);

	useEffect(() => {
		dispatch(allOutlets());
		dispatch(remoteMachine());
	}, [dispatch]);

	useEffect(() => {
		if (machineData) {
			// let washerAmount = machineData.filter((e) => e.machine_type === 'washer');
			// let dryerAmount = machineData.filter((e) => e.machine_type === 'dryer');
			// let vendingAmount = machineData.filter((e) => e.machine_type === 'vending');
			// setWashers(washerAmount);
			// setDryers(dryerAmount);
			// setVendings(vendingAmount);
		}
	}, [machineData]);

	// const onFinish = (values) => {
	//   // console.log(values);
	//   dispatch(changePassword(values));
	// };

	useEffect(() => {
		if (password) {
			message.success('Password has been changed');
			// setModal(false);
		}
	}, [password]);

	return (
		<div className='user-profile'>
			{/* user profile currently unavailable for operator */}
			{/* {modal ? (
        <Modal
          className="modal-password"
          closable={false}
          centered
          open={modal}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => setModal(false)}
          cancelText="Cancel"
          width={500}
        >
          <div className="border">
            <h5>Change Password</h5>
            <Form onFinish={onFinish} name="password-form">
              Please enter your current password
              <Form.Item
                name="oldPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input type="password" placeholder="Current Password" />
              </Form.Item>
              Please enter your new password
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    // required: true,
                    message: "Please input your new password!",
                  },
                ]}
              >
                <Input type="password" placeholder="New Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password!",
                  },
                ]}
              >
                <Input type="password" placeholder="Confirm Password" />
              </Form.Item>
              <Button htmlType="submit" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Modal>
      ) : (
        ""
      )}
      <div style={{ marginTop: "3.5rem" }}>
        <img
          className="avatar"
          style={{ width: "130px", display: "block" }}
          src={avatar}
          alt=""
        />
      </div>
      <div className="user-info" style={{ marginTop: "4.5rem" }}>
        <h4 className="info">{operator && operator.data.username}</h4>
        <span className="info" style={{ color: "grey" }}>
          {operator && operator.data.email}
        </span>
        <p className="info mt-4 mb-4">Laundro</p>
        <div className="outlet-stats">
          <div className="text-center">
            <span className="num">{outlets ? outlets.length : 0}</span>
            <br />
            <small>Outlets</small>
          </div>
          <div className="text-center">
            <span className="num">{dryers ? dryers.length : 0}</span>
            <br />
            <small>Dryers</small>
          </div>
          <div className="text-center">
            <span className="num">{washers ? washers.length : 0}</span>
            <br />
            <small>Washers</small>
          </div>
          <div className="text-center">
            <span className="num">{vendings ? vendings.length : 0}</span>
            <br />
            <small>Vending</small>
          </div>
        </div>
        <div className="btn-container">
          <Button
            type="primary"
            style={{ marginRight: "1rem", marginTop: "1rem" }}
            onClick={() => setModal(!modal)}
            className="login-form-button"
          >
            Change Password
          </Button>

          <Button
            style={{ marginTop: "1rem" }}
            // size="large"
            type="primary"
            //  htmlType="submit"
            className="login-form-button"
          >
            Account ID
          </Button>
        </div>
      </div>
      <div className="card outlet-list">
        <div style={{ padding: "10px 25px" }} className="card-head">
          <h5 className="">List of Outlets</h5>
        </div>
        <div
          className="scrollbar-div"
          style={{ overflowY: "scroll", height: "180px" }}
        >
          {outlets.map((outlet) => {
            return (
              <div style={{ margin: "15px 25px" }} className="">
                <div className="d-flex box">
                  <img
                    style={{ width: "40px", marginRight: ".5rem" }}
                    src={washerColorful}
                    alt=""
                  />
                  <div>
                    <span>{outlet.fullname}</span>
                    <br />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
		</div>
	);
};

export default UserProfile;
