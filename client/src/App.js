import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useBetween } from "use-between";

import Sidebar from "./Components/UI/Sidebar/Sidebar";
import Nav from "./Components/UI/Nav/Nav";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Category from "./Pages/Category/Category";
import TypeCategory from "./Pages/TypeCategory/TypeCategory";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import User from "./Pages/Users/User";
import useShareableState from "./useShareableState/useShareableState";

import { GlobalProvider } from "./context/GlobalState";

import "./App.css";

const App = () => {
  const { leftOpen } = useBetween(useShareableState);
  let leftOpenSide = leftOpen ? "open" : "closed";

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <div className="wrapper">
          <Sidebar />
          <div className={`main ${leftOpenSide}`}>
            <Nav />
            <div className="content">
              <Switch>
                <Route exact path="/" component={Dashboard} />

                <Route path="/user" component={User} />
                <Route path="/categories" component={Category} />
                <Route path="/typecategories" component={TypeCategory} />
                <Route path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
