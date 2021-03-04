import React from "react";
import { Layout, Breadcrumb } from "antd";
import DataTable from "../components/Content/DataTable"
export default function DataSet({children,}) {
  return (
      <Layout style={{ padding: "0 24px 24px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout.Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <DataTable />
        </Layout.Content>
      </Layout>
  );
}
