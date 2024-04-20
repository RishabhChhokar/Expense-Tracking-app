import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate("./auth");
  };

  useEffect(() => {
    if (isLoggedIn) navigate("./");
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
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
