import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Redirect, Route } from "react-router-dom";
import { useBetween } from "use-between";

import useShareableState from "./useShareableState/useShareableState";

import Sidebar from "./Components/UI/Sidebar/Sidebar";
import Nav from "./Components/UI/Nav/Nav";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let { isAuthUser } = useContext(GlobalContext);
  // let { user } = useContext(GlobalContext);

  console.log("[PrivateRoute] isAuthUser >> ", isAuthUser);

  // let userLog = (user != undefined) ? true : false

  const { leftOpen } = useBetween(useShareableState);
  let leftOpenSide = leftOpen ? "open" : "closed";

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthUser ? (
          // userLog ? (
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

export default React.memo(PrivateRoute);
