import React, { createContext, useEffect, useState } from "react";
import api from '../api'

export const AuthContext = createContext({});

export const AuthActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    UPDATE_USER: "UPDATE_USER"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false
    });

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                })
            }
            case AuthActionType.UPDATE_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            default:
                return auth;
        }
    }

    auth.registerUser = async function(userData) { 
        try {
            const response = await api.createUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
            }
        }
        catch (err) {
            console.log(err);
            console.log(err.response.data.errorMessage);
        }
    }

    auth.loginUser = async function(userData) {
        try {
            const response = await api.findUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
            } 
        }
        catch (err) {
            console.log(err);
        }
    }

    auth.updateUser = async function(userData) {
        try {
            const response = await api.updateUser(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.UPDATE_USER,
                    payload: {
                        user: response.data.user
                    }
                })
            } 
        }
        catch (err) {
            console.log(err);
        }
    }

    auth.logoutUser = async function() {
        authReducer({
            type: AuthActionType.LOGOUT_USER,
            payload: {
            }
        })
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };