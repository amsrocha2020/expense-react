import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { useBetween } from "use-between";

import Sidebar from './Components/UI/Sidebar/Sidebar';
import Nav from './Components/UI/Nav/Nav';
import Dashboard from './Pages/Dashboard/Dashboard';
import Category from './Pages/Category/Category';
import TypeCategory from './Pages/TypeCategory/TypeCategory';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import User from './Pages/Users/User';
import useShareableState from "./useShareableState/useShareableState";

import { GlobalProvider } from './context/GlobalState';

import './App.css';

function App() {
    const [userData, setUserData] = useState({
      token: undefined,
      user: undefined,
    });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
    
      const tokenRes = await axios.post(
        "/users/tokenIsValid",
        null,
        { headers: {'x-auth-token': token}}
        );
        if (tokenRes.data) {
          const userRes = await axios.get("/users/", { 
              headers: {'x-auth-token': token}
            });
        setUserData({
          token,
          user: userRes.data
        });    
        }
    }
    checkLoggedIn();
  }, [])

  const { leftOpen } = useBetween(useShareableState);
  let leftOpenSide = leftOpen ? "open" : "closed";

  return (
    <GlobalProvider value={{ userData, setUserData }}>
    <div className="wrapper">
      <Sidebar/>
      <div className={`main ${leftOpenSide}`}>
        <Nav/>
        <div className="content">
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/user" component={User} />
              <Route path="/categories" component={Category} />
              <Route path="/typecategories" component={TypeCategory} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
        </div>
      </div>
    </div>
    </GlobalProvider>
  );
}

export default App;
