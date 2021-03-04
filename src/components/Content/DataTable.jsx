import React, { Component } from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import OperationDropdown from "../Dropdown/OperationDropdown";
import { Link } from "react-router-dom";
// import numeral from "numeral";

const props = {
  bordered: true,
  loading: false,
  pagination: { position: "bottom", pageSize: 10 },
  size: "default",
  title: undefined,
  showHeader: true,
  // rowSelection: {},
  scroll: { x: 600, y: 500 },
};

export default class DataTable extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
  };

  componentDidMount() {
    this.UserList();
  }

  UserList() {
    axios
      .get("api/admin/credit-contents")
      .then((response) => this.setState({ data: response.data.records }));
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
    const columns = [
      {
        title: "Table name ",
        dataIndex: "tableName",
        key: "tableName",
        ...this.getColumnSearchProps("tableName"),
        render: (text, record) => (
          <Link to={{ pathname: "/detail"  , query: { text: text } }}>
            {text}
          </Link>
        ),
      },
      {
        title: "Rows",
        dataIndex: "rows",
        key: "rows",
        ...this.getColumnSearchProps("rows"),
      },
      {
        title: "Columns",
        dataIndex: "columns",
        key: "columns",
        ...this.getColumnSearchProps("columns"),
      },
      {
        title: "Key",
        dataIndex: "key",
        key: "key",
        ...this.getColumnSearchProps("key"),
      },
      {
        title: "Imported date",
        dataIndex: "importedDate",
        key: "importedDate",
        ...this.getColumnSearchProps("importedDate"),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        ...this.getColumnSearchProps("description"),
      },
      // {
      //   title: "Action",
      //   width: 100,
      //   render: (text, record) => <OperationDropdown key="" text={text} record={record}/>,
      // },
    ];
    return <Table {...props} columns={columns} dataSource={this.state.data} />;
  }
}
