import React, { Component } from "react";
import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import App  from "./DataTable";
const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const onSearch = (value) => console.log(value);

export default class Content extends Component {
  render() {
    return (
      <Col>
        <Col span={8} className="m-x-1">
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
        </Col>
       
        <Row>
          <Col span={24}>
            <App />
          </Col>
        </Row>
        </Col>
    );
  }
}
