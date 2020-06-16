import React from "react";

import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";
import useShareableState from "../../../useShareableState/useShareableState";
import { useBetween } from "use-between";

const sidebar = (props) => {
  const { leftOpen } = useBetween(useShareableState);
 
  let leftOpenSide = leftOpen ? "open" : "closed";

  return (
    <nav className={`sidebar ${leftOpenSide}`}>
      <div className="sidebar-content">
        <div className="sidebar-brand">
          <div className="align-middle">
            <img
              className="logo align-middle mr-2"
              src="./logo.png"
              alt="user"
            />
          </div>
        </div>
        <div className="sidebar-user">
          <img
            src="./foto_rocha.jpeg"
            className="img-fluid rounded-circle mb-2"
            alt="Miguel Rocha"
          />
          <div className="sidebar-username">Miguel Rocha</div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Main Section</li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="/dashboard">
              <i className="fa fa-tachometer" aria-hidden="true"></i>
              <span className="sidebar-text">Dashboard</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="/dashboard">
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              <span className="sidebar-text">Budgets</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="/categories">
              <i className="fa fa-th-list" aria-hidden="true"></i>
              <span className="sidebar-text">Categories</span>
            </a>
          </li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="/typecategories">
              <i className="fa fa-th-list" aria-hidden="true"></i>
              <span className="sidebar-text">Type Categories</span>
            </a>
          </li>

          <li className="sidebar-header">Definitions</li>
          <li className="sidebar-item">
            <a className="sidebar-link" href="#">
              <i className="fa fa-user" aria-hidden="true"></i>
              {["right"].map((direction) => (
                <DropdownButton
                  as={ButtonGroup}
                  key={direction}
                  id={`dropdown-button-drop-${direction}`}
                  drop={direction}
                  variant="secondary"
                  title="User"
                >
                  <Dropdown.Item eventKey="1"><a href="/user">Account</a></Dropdown.Item>
                  <Dropdown.Item eventKey="2">Change Password</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="3">
                    Terms and Conditions
                  </Dropdown.Item>
                </DropdownButton>
              ))}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default sidebar;
