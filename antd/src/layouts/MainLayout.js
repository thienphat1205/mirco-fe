import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
