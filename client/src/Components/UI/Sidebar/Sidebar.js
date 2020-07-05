import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as Feather from "react-feather";
import useShareableState from "../../../useShareableState/useShareableState";

import { GlobalContext } from "../../../context/GlobalState";
import { useBetween } from "use-between";

const sidebar = (props) => {
  const { leftOpen } = useBetween(useShareableState);
  let leftOpenSide = leftOpen ? "open" : "closed";

  let { user } = useContext(GlobalContext);

  const [open, setOpen] = useState(false);

  const toggle = (e) => {
    setOpen(!open);
    e.preventDefault();
    e.stopPropagation();
  };

  const isExpanded = open ? "open" : "";
  const ExpandIcon = open ? Feather.ChevronDown : Feather.ChevronRight;

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
          <div className="sidebar-username">
            {" "}
            {user ? user.firstName + " " + user.lastName : "No Name"}{" "}
          </div>
        </div>
        <ul className="sidebar-nav">
          <li className="sidebar-header">Main Section</li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard">
              <i className="fa fa-tachometer" aria-hidden="true"></i>
              <span className="sidebar-text">Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/dashboard">
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              <span className="sidebar-text">Budgets</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/categories">
              <i className="fa fa-th-list" aria-hidden="true"></i>
              <span className="sidebar-text">Categories</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link className="sidebar-link" to="/typecategories">
            <i class="fa fa-file-text-o" aria-hidden="true"></i>
              <span className="sidebar-text">Type Categories</span>
            </Link>
          </li>

          <li className="sidebar-header">Definitions</li>
          <li className={`sidebar-item ${isExpanded}`}>
            <a
              className="sidebar-link"
              href="#!"
              role="button"
              onClick={toggle}
            >
              <i className="fa fa-user" aria-hidden="true"></i>
              <span className="sidebar-text">User</span>{" "}
              <span className="sidebar-expandIcon"><ExpandIcon className="menu-expand-icon" /></span>
            </a>
            {open && (
              <ul className="">
                <li>
                  <Link className="sidebar-link" to="/user"><i class="fa fa-address-card-o" aria-hidden="true"></i><span className="sidebar-text">Account</span></Link>
                </li>
                <li>
                  <Link className="sidebar-link" to="/user"><i class="fa fa-key" aria-hidden="true"></i><span className="sidebar-text">Change Password</span></Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default sidebar;
