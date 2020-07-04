import React, { useContext } from "react"
import { GlobalContext } from "./context/GlobalState"
import { Redirect, Route } from "react-router-dom"
import { useBetween } from "use-between"

import useShareableState from "./useShareableState/useShareableState"

import Sidebar from "./Components/UI/Sidebar/Sidebar"
import Nav from "./Components/UI/Nav/Nav"
import Footer from "./Components/UI/Footer/Footer"

const PrivateRoute = ({ component: Component, ...rest }) => {
  let { isAuthUser } = useContext(GlobalContext);

  console.log("[PrivateRoute] isAuthUser >> ", isAuthUser)

  const { leftOpen } = useBetween(useShareableState)
  let leftOpenSide = leftOpen ? "open" : "closed"

  return (
    <Route
      {...rest}
      render={(props) =>
        // isAuthUser ? (
        true ? (
          <React.Fragment>
          <div className="wrapper">
            <Sidebar />
            <div className={`main ${leftOpenSide}`}>
              <Nav />
              <div className="content">
                <Component {...props} />
              </div>
            </div>
          </div>
        <Footer />
        </React.Fragment>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default React.memo(PrivateRoute)
