import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Category from "./Pages/Category/Category";
import TypeCategory from "./Pages/TypeCategory/TypeCategory";
import Login from "./Components/auth/Login";
import User from "./Pages/Users/User";
import PrivateRoute from "./PrivateRoute";

import { GlobalProvider } from "./context/GlobalState";

import "./App.css";

const App = () => {
  return (

    <GlobalProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/user" component={User} />
          <PrivateRoute path="/categories" component={Category} />
          <PrivateRoute path="/typecategories" component={TypeCategory} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
};



export default App;
