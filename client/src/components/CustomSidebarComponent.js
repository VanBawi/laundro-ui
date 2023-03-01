import React, { useState, useEffect } from "react";
import {
  DashboardOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { Layout, Menu, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Sider } = Layout;

const CustomSidebarComponent = ({
  collapsed,
  setCollapsed,
  showDrawer,
  setShowDrawer,
  devSideBars
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch()


  function getItem(label, key, icon, children) {
    return {
      label,
      key,
      icon,
      children,
    };
  }


  const items = [
    getItem("Roles Dashboard", "/role/dashboard", <DashboardOutlined />, null),
    getItem("Add Role", "/roleList", <UserOutlined />, null),
  ];



  return (
    <Sider
      width="250"
      className="sidebar-sider"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="sidebar-menu-logo" />
      <div className="d-flex flex-column justify-content-between">
        <div>
          {showDrawer ? (
            <Drawer
              headerStyle={{ height: "300px" }}
              placement="left"
              width="250"
              onClose={() => setShowDrawer(false)}
              open={showDrawer}
            >
              <Menu
                theme="light"
                mode="inline"
                items={items}
                onClick={(e) => {
                  setShowDrawer(false);
                  navigate(e.key);

                }}
              />
            </Drawer>
          ) : (
            <Menu
              // className="laundro-antd-menu"
              theme="light"
              mode="inline"
              items={items}
              onClick={(e) => {
                navigate(e.key);
              }}
            />
          )}
        </div>
      </div>
    </Sider>
  );
};

export default CustomSidebarComponent;
