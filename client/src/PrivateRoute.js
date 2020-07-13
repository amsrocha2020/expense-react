import React, { useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Redirect, Route } from "react-router-dom";
import Sidebar from "./Components/UI/Sidebar/Sidebar";
import Nav from "./Components/UI/Nav/Nav";
import Footer from "./Components/UI/Footer/Footer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { leftOpen } =  useContext(GlobalContext);
  let { isAuthUser } = useContext(GlobalContext);
  let leftOpenSide = leftOpen ? "open" : "closed";

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
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );
};

export default React.memo(PrivateRoute)
