import React, { Component } from "react";
import "antd/dist/antd.css";
import "./Navbar.css";
import UserDropdown from "../Dropdown";
import { Link } from "react-router-dom";
// import logo from "../../../public/logo.png"

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="logo img" />
        </div>
        <ul className="nav-links">
          <Link to="/" className="nav-link actived">
            <li>Data</li>
          </Link>
          <li>
            <Link to="/" className="nav-link">
              Feature set
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link">
              Modeling
            </Link>
          </li>
          <li>
            <Link href="#" className="nav-link">
              Analytics
            </Link>
          </li>
        </ul>
        <div className="user">
          <UserDropdown />
        </div>
      </nav>
    );
  }
}
