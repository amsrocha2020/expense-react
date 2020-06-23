import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useBetween } from "use-between";

import Sidebar from './Components/UI/Sidebar/Sidebar';
import Nav from './Components/UI/Nav/Nav';
import Dashboard from './Pages/Dashboard/Dashboard';
import Category from './Pages/Category/Category';
import TypeCategory from './Pages/TypeCategory/TypeCategory';
import User from './Pages/Users/User';
import useShareableState from "./useShareableState/useShareableState";

import Login from './Pages/Login/Login';
import { AuthContext } from './context/auth-context';

import { GlobalProvider } from './context/GlobalState';

import './App.css';

const App = props => {
  const { leftOpen } = useBetween(useShareableState);
  const authContext = useContext(AuthContext);

  let leftOpenSide = leftOpen ? "open" : "closed";
   
  let inside = <GlobalProvider>
    <div className="wrapper">
      <Sidebar/>
      <div className={`main ${leftOpenSide}`}>
        <Nav/>
        <div className="content">
        <Router>
            <Switch>
              <Route exact path="/user" component={User} />
              <Route exact path="/categories" component={Category} />
              <Route exact path="/typecategories" component={TypeCategory} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Dashboard} />
            </Switch>
        </Router>
        </div>
      </div>
    </div>
    </GlobalProvider>;
  
    let content = <Login />
    if (authContext.isAuth) {
      content = inside;
    }

    return content;
}

export default App;
