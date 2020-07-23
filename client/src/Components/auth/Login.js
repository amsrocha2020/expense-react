import React, { useContext, useState, Fragment } from "react";
import * as ReactBootStrap from 'react-bootstrap';

import "./Login.css";

import { GlobalContext } from "../../context/GlobalState";
import { useHistory } from "react-router-dom";

const Login = () => {
  const { isAuthUser, logIn, msgError } = useContext(GlobalContext)

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  let history = useHistory()

  if (isAuthUser) history.push("/");

  const submit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    const userData = { email, password };
    logIn(userData);
  };

  return (
    <Fragment>
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={submit}>
            <span className="login-form-title">LOGIN</span>
            { msgError !== '' ? 
              (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {msgError.msg}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              ) 
              : '' }
            <span className="pb-1">USERNAME</span>
            <div
              className="wrap-input validate-input"
              data-validate="Username is required"
            >
              <input
                className="input"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
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
              <input
                className="input"
                type="password"
                name="pass"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input"></span>
            </div>
            <span>
              Do you want to <a href="/register">register</a>?
            </span>
            <div className="container-login-form-btn mt-3">
                <button className="login-form-btn"><span className="mr-2">Login</span> { loading ? (<ReactBootStrap.Spinner animation="border" />) : '' }  </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Login;
