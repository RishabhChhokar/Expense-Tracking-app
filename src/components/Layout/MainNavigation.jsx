import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const handleEmailVerification = async () => {
    try {
      await authCtx.sendEmailVerification();
      alert("Verification email sent! Please check your inbox.");
    } catch (error) {
      alert("Failed to send verification email. Please try again later.");
      console.error("Verification email error:", error);
    }
  };

  const navigate = useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate("./auth");
  };

  useEffect(() => {
    navigate("./");
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) navigate("./auth");
  }, [isLoggedIn]);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Expense Tracker</div>

      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
          {authCtx.isLoggedIn && !authCtx.isEmailVerified && (
            <li>
              <button onClick={handleEmailVerification}>Verify Email</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
