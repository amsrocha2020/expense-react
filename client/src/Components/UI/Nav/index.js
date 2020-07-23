import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";

import AuthOptions from "../../auth/AuthOptions";

import { GlobalContext } from "../../../context/GlobalState";

const nav = (props) => {
  const { leftOpen, sidebar } =  useContext(GlobalContext);

  return (
    <div className="navbar navbar-expand">
      <span className="sidebar-toggle d-flex mr-2" onClick={() => sidebar(leftOpen)}>
        <i className="hamburger align-self-center"></i>
      </span>
      <form className="form-inline">
        <input
          placeholder="Search..."
          aria-label="Search"
          type="text"
          className="form-control-lite form-control"
        />
      </form>
      <div className="navbar-icons navbar-collapse">
        <ul className="ml-auto navbar-nav">
        <li className="nav-item">
            <img
              className="painel-control svg-inline--fa align-middle mr-2"
              src="./settings.svg"
              alt="settings"
            />
          </li>
          <li className="nav-item">
            <DropdownButton id="dropdown-basic-button"
              title={
                <span>
                  <i className="fa fa-user fa-fw"></i>
                </span>
              }
            >
              <NavLink className="dropdown-item" to="/user">Account</NavLink>
              <Dropdown.Item eventKey="4"></Dropdown.Item>
            </DropdownButton>
          </li>
          <li>
            <AuthOptions />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default nav;
