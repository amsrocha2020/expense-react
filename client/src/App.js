import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Budgets from "./Pages/Budgets/Budgets";
import Category from "./Pages/Category/Category";
import TypeCategory from "./Pages/TypeCategory/TypeCategory";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import User from "./Pages/Users/User";
import ChangePassword from "./Pages/ChangePassword/ChangePassword";
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
          <PrivateRoute path="/changepassword" component={ChangePassword} />
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
