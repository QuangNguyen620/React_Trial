import React from "react";
import { Menu, Dropdown, Popconfirm } from "antd";
import { ControlOutlined } from "@ant-design/icons";
import ModalDropDown from "../Modal/ModalDropDown.jsx";
import { QuestionCircleOutlined } from "@ant-design/icons";

function handleClick(id) {
  console.log(id);
  const requestOptions = {
    method: "DELETE",
  };

  // Note: I'm using arrow functions inside the `.fetch()` method.
  // This makes it so you don't have to bind component functions like `setState`
  // to the component.
  // fetch("/api/admin/credit-contents/customer-info/" + id, requestOptions)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((result) => {
  //     // do what you want with the response here
  //   });
}

export default function OperationDropdown({ children, id }) {
  const menu = (
    <Menu>
      <Menu.Item>
        <ModalDropDown id={id}/>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          View
        </a>
      </Menu.Item>
      <Menu.Item>
        <Popconfirm
          title="Are you sure to delete this row？"
          icon={
            <QuestionCircleOutlined
              style={{ color: "red" }}
              onClick={handleClick(id)}
            />
          }
        >
          <a href="#">Delete</a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} placement="bottomCenter">
        <div className="mx-3">
          <ControlOutlined style={{ fontSize: "1.5rem", color: "#08c" }} />
        </div>
      </Dropdown>
    </div>
  );
}
