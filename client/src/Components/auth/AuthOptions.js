import React, { Fragment, useContext } from 'react';
import { useHistory } from "react-router-dom";

import { GlobalContext } from '../../context/GlobalState';

function AuthOptions() {
    let { logOut, user, isAuthUser } = useContext(GlobalContext);

    let history = useHistory()

    const register = () => history.push("/register");
    const login    = () => history.push("/login");
    const logout   = () => {
        user = {};
        logOut(user);
        history.push("/login");
    };

    return(
        <Fragment>
            {isAuthUser ? (
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