import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { GlobalContext } from '../../context/GlobalState';

function AuthOptions() {
    const { checkLoggedIn } = useContext(GlobalContext)
    let { user, isAuthUser } = useContext(GlobalContext)

    let history = useHistory()

    const register = () => history.push("/register");
    const login    = () => history.push("/login");
    const logout   = () => {
        isAuthUser = false
        user = {}
        console.log("[AuthOptions] isAuthUser >> ", isAuthUser)
        console.log("[AuthOptions] User Data -> ", user)
        localStorage.setItem("auth-token", "")
        history.push("/login")
    };
    
    useEffect(() => {
        checkLoggedIn();
      }, []);

    return(
        <Fragment>
            {/* {isAuthUser ? ( */}
            {true ? (
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

export default React.memo(AuthOptions)