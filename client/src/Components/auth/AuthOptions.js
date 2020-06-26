import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

export default function AuthOptions() {
    const { userData, setuserData } = useContext(GlobalContext);

    let history = useHistory();

    const register = () => history.push("/register");
    const login    = () => history.push("/login");
    const logout   = () => {
        setuserData({
            token: undefined,
            userData: undefined
        });
        localStorage.setItem("auth-token", "");
    };
    
    console.log("Auth -> ", userData);

    return(
        <div>
            {/* {userData.user ? ( */}
            {true ? ( 
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