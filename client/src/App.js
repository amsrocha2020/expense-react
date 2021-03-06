import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import Budgets from "./Pages/Budgets";
import Category from "./Pages/Category";
import TypeCategory from "./Pages/TypeCategory";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import User from "./Pages/Users";
import PrivateRoute from "./PrivateRoute";

import { GlobalProvider } from "./context/GlobalState";

import "./App.css";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/user" component={User} />
          <PrivateRoute path="/categories" component={Category} />
          <PrivateRoute path="/typecategories" component={TypeCategory} />
          <PrivateRoute path="/budgets" component={Budgets} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
};



export default App;
