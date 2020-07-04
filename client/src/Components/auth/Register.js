import React, { Fragment, useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import axios from 'axios';

import "./Login.css";

const register = (props) => {
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ firstName, setFirstName ] = useState();
    const [ lastName, setLastName ] = useState();

    const { logIn } = useContext(GlobalContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const newUser = { firstName, lastName, email, password};
        await axios.post("/users/register",newUser);
        // const loginRes = await axios.post("/users/login", { email, password });
        logIn(newUser)
        // localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    }

  return (
    <Fragment>
      <div className="container-login">
        <div className="wrap-login">
          <form onSubmit={submit} className="login-form" action="">
            <span className="login-form-title">REGISTER</span>
            <span className="pb-1">FIRST NAME</span>
            <div
              className="wrap-input validate-input"
              data-validate="First Name is required"
            >
              <input
                className="input"
                type="text"
                name="firstName"
                id="firstName"
                onChange={e => setFirstName(e.target.value)}
              />
              <span className="focus-input"></span>
            </div>
            <span className="pb-1">LAST NAME</span>
            <div
              className="wrap-input validate-input"
              data-validate="Last Name is required"
            >
              <input
                className="input"
                type="text"
                name="lastName"
                id="lastName"
                onChange={e => setLastName(e.target.value)}
              />
              <span className="focus-input"></span>
            </div>
            <span className="pb-1">EMAIL</span>
            <div
              className="wrap-input validate-input"
              data-validate="Email is required"
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
              <input className="input" type="password" name="pass" id="pass" onChange={e => setPassword(e.target.value)}/>
              <span className="focus-input"></span>
            </div>
            <div className="container-login-form-btn">
              <button className="login-form-btn">SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default register;
