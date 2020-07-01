import React, { useContext, useState, Fragment } from 'react';

import "./Login.css";

import { GlobalContext } from "../../context/GlobalState";
import { useHistory } from 'react-router-dom';

const Login = () => {
  const { logIn } = useContext(GlobalContext);
  // console.log("[Login]  isAuthUser >> ", isAuthUser)

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    
    let history = useHistory();

    const submit = (e) => {
      e.preventDefault();
      
      const userData = { email, password };   
      logIn(userData);

      history.push("/");
  }

  return (
    <Fragment>
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={submit}>
            <span className="login-form-title">LOGIN</span>
            <span className="pb-1">USERNAME</span>
            <div
              className="wrap-input validate-input"
              data-validate="Username is required"
            >
              <input className="input" type="email" name="email" id="email" onChange={e => setEmail(e.target.value)}/>
              <span className="focus-input"></span>
            </div>
            <span className="pb-1">PASSWORD</span>
            <div
              className="wrap-input validate-input"
              data-validate="Password is required"
            >
              <span className="btn-show-pass">
                <i className="fa fa-eye"></i>
              </span>
              <input className="input" type="password" name="pass" id="password" onChange={e => setPassword(e.target.value)}/>
              <span className="focus-input"></span>
            </div>
            <span>Do you want to <a href="/register">register</a>?</span>
            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
