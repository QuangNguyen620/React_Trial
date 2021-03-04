import React, { Component } from "react";
import { Table, Input, Button, Space, Modal, Form, Row, Col, DatePicker } from "antd";
import { Layout, Breadcrumb } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import OperationDropdown from "../Dropdown/OperationDropdown";
import { when } from "jquery";

const props = {
  bordered: true,
  loading: false,
  pagination: { position: "bottom", pageSize: 10 },
  size: "default",
  title: undefined,
  showHeader: true,
  scroll: { x: 600, y: 500 },
};

// const urlString = window.location.href;
// const url = new URL(urlString);
// const tableName = url.href.replaceAll(url.origin, "").replaceAll("/", "");

const CollectionCreateForm = ({ visible, onCreate, onCancel, header }) => {
  const list = [];
  console.log(header);
  const secondList = [];
  for (let i = 0; i < header.length; i++) {
    if (i <= header.length / 2) {
      list.push(
        <Form.Item
          className="mx-2"
          name={header[i].tableColumn}
          label={header[i].tableColumn}
          rules={[
            {
              required: true,
              message: `Column ${header[i].tableColumn} must be fill`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      );
    } else {
      secondList.push(
        <Form.Item
          className="mx-3"
          name={header[i].tableColumn}
          label={header[i].tableColumn}
          rules={[
            {
              required: true,
              message: `Column ${header[i].tableColumn} must be fill`,
            },
          ]}
        >
          <Input />
        </Form.Item>
      );
    }
  }

  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      width={1000}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Row>
          <Col xl={12}>{list}</Col>
          <Col xl={12}>{secondList}</Col>
        </Row>

        {/* <Form.Item name="description" label="Description">
          <Input type="textarea" />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

const CollectionsPage = ({ header, tableName }) => {
  const [visible, setVisible] = React.useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    axios
      .post(`api/admin/credit-contents/${tableName}`, values)
      .then(
        (response) => console.log(response)
        // this.setState({
        //   data: response.data.records,
        //   header: response.data.header,
        // })
      );
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        header={header}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default class CustomerInfo extends Component {
  state = {
    searchText: "",
    searchedColumn: "",
    tableName:this.props.location.query.text,
    data: [],
    header: [],
  };

  componentDidMount() {
    this.UserList();
  }

  UserList() {
    axios
      .get(`api/admin/credit-contents/${this.state.tableName}`)
      .then((response) =>
        this.setState({
          data: response.data.records,
          header: response.data.header,
        })
      );
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    confirm({ closeDropdown: false });
                    this.setState({
                      searchText: selectedKeys[0],
                      searchedColumn: dataIndex,
                    });
                  }}
                >
                  Filter
                </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const header = this.state.header;
    const columns = this.state.header.map((key, index) => ({
      title: `${key.tableColumn}`,
      dataIndex: `${key.tableColumn}`,
      key: `${key.tableColumn}`,
      width: 200,
      ...this.getColumnSearchProps(`${key.tableColumn}`),
    }));
    columns.push({
      title: "Action",
      dataIndex: "ID",
      key: "ID",
      width: 100,
      fixed: "right",
      render: (text, record) => (
        <OperationDropdown key="ID" id={text} record={record} />
      ),
    });
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
          <CollectionsPage header={this.state.header} tableName={this.state.tableName} />
          <Table {...props} columns={columns} dataSource={this.state.data} />
        </Layout.Content>
      </Layout>
    );
  }
}
