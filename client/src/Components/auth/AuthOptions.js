import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { GlobalContext } from '../../context/GlobalState';

export default function AuthOptions() {
    const { checkLoggedIn } = useContext(GlobalContext)
    let { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext)

    let history = useHistory()

    const register = () => history.push("/register");
    const login    = () => history.push("/login");
    const logout   = () => {
        isAuthenticated = false
        localStorage.setItem("auth-token", "")
        history.push("/login")
    };
    
    useEffect(() => {
        checkLoggedIn();
      }, []);

    return(
        <Fragment>
            {isAuthenticated ? (
                <button onClick={logout}>Logout</button>
                ) : (
                    <div>
                        <button className="mr-3" onClick={register}>Register</button>
                        <button onClick={login}>Login</button>
                    </div>
                )}
        </Fragment>
    )
}