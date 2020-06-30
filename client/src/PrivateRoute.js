import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Redirect, Route } from "react-router-dom";
import { useBetween } from "use-between";

import useShareableState from "./useShareableState/useShareableState";

import Sidebar from "./Components/UI/Sidebar/Sidebar";
import Nav from "./Components/UI/Nav/Nav";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { leftOpen } = useBetween(useShareableState);
  let leftOpenSide = leftOpen ? "open" : "closed";

  let { isAuthenticated } = useContext(GlobalContext);
  
  console.log("PrivateRoute isAuthenticated -> ", isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
          isAuthenticated ? (
          <div className="wrapper">
            <Sidebar />
            <div className={`main ${leftOpenSide}`}>
              <Nav />
              <div className="content">
                <Component {...props} />
              </div>
            </div>
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
