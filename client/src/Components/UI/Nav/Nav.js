import React from "react";

import { useBetween } from "use-between";

import useShareableState from "../../../useShareableState/useShareableState";

const nav = (props) => {
  const { leftOpen, setleftOpen } = useBetween(useShareableState);

  return (
    <div className="navbar navbar-expand">
      <span className="sidebar-toggle d-flex mr-2" onClick={() => setleftOpen(!leftOpen)}>
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
              src="./notifications.svg"
              alt="notification"
            />
          </li>
          <li className="nav-item">
            <img
              className="painel-control svg-inline--fa align-middle mr-2"
              src="./settings.svg"
              alt="settings"
            />
          </li>
  <li className="nav-item logout">Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default nav;
