/* eslint-disable react/prop-types */
import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./auth-slice";
import { expenseActions } from "./expense-slice";
const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  
  const dispatch = useDispatch();

  const userIsLoggedIn = !!token;

  const loginHandler = (token, email) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    
    dispatch(authActions.login({ email: email, token: token }));
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    dispatch(expenseActions.setItemsEmpty());
    dispatch(authActions.logout());
    if(localStorage.getItem("isDark") !== null){
      localStorage.setItem("isDark","false")
    }
  };

  useEffect(() => {
    let logoutTimer;

    if (userIsLoggedIn) {
      logoutTimer = setTimeout(() => {
        logoutHandler();
        alert("You have been logged out due to inactivity.");
      }, 60 * 60 * 1000);
    }
    return () => clearTimeout(logoutTimer);
  }, [userIsLoggedIn]);

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
