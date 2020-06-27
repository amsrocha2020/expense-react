import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { GlobalContext } from '../../context/GlobalState';

export default function AuthOptions() {
    const { checkLoggedIn } = useContext(GlobalContext);
    let { userData } = useContext(GlobalContext);

    let history = useHistory();

    const register = () => history.push("/register");
    const login    = () => history.push("/login");
    const logout   = () => {
        userData = undefined;
        history.push("/login");
        localStorage.setItem("auth-token", "");
    };
    
    console.log("Auth -> ", userData);

    useEffect(() => {
        checkLoggedIn();
      }, []);

    return(
        <div>
            {userData ? (
                <button onClick={logout}>Logout</button>
                ) : (
                    <div>
                        <button onClick={register}>Register</button>
                        <button onClick={login}>Login</button>
                    </div>
                )}
        </div>
    )
}