import React, { useState, useEffect } from "react";
import {auth} from "../firebase/firebase"
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  isEmailVerified: false,
  sendEmailVerification: async () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const userIsLoggedIn = !!token;

  
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setIsEmailVerified(false);
  };

  const sendEmailVerification = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.sendEmailVerification();
      } else {
        throw new Error("User not found. Please log in again.");
      }
    } catch (error) {
      throw new Error("Error sending verification email:", error);
    }
  };
  
   useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((user) => {
       if (user) {
         setToken(user.uid);
         setIsEmailVerified(user.emailVerified);
       } else {
         setToken(null);
         setIsEmailVerified(false);
       }
     });

     return () => unsubscribe();
   }, []);
  

  useEffect(() => {
    let logoutTimer;

    if (userIsLoggedIn) {
      logoutTimer = setTimeout(() => {
        logoutHandler();
        alert("You have been logged out due to inactivity.");
      }, 5 * 60 * 1000);
    }

    return () => clearTimeout(logoutTimer);
  }, [userIsLoggedIn]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    isEmailVerified: isEmailVerified,
    login: loginHandler,
    logout: logoutHandler,
    sendEmailVerification: sendEmailVerification,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
