import React from 'react';

import "./Login.css";

const login = (props) => (
    <div>
        <div className="container-login">
            <div className="wrap-login">
            <form className="login-form" action="">
                <span className="login-form-title">LOGIN</span>
                <span className="pb-1">USERNAME</span>
            <div className="wrap-input validate-input" data-validate="Username is required">
                <input className="input" type="text" name="username" />
                <span className="focus-input"></span>
            </div>
            <span className="pb-1">PASSWORD</span>
            <div className="wrap-input validate-input" data-validate="Password is required">
                <span className="btn-show-pass">
                    <i className="fa fa-eye"></i>
                </span>
                <input className="input" type="password" name="pass" />
                <span className="focus-input"></span>
            </div>
            <div className="container-login-form-btn">
            <button className="login-form-btn">
            Login
            </button>
            </div>
        </form>
            </div>
        </div>
    </div>
    
    );

    export default login;