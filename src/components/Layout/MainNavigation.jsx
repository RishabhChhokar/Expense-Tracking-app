import { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import AuthContext from "../../store/auth-context";
import { themeActions } from "../../store/theme-slice";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;
  const dispatch = useDispatch();

  const premium = useSelector((state) => state.auth.isPremium);
  const items = useSelector((state) => state.expenseStore.items);
  const isDarkMode = useSelector((state) => state.theme.isDark);

  const toggleDarkModeHandler = () => {
    dispatch(themeActions.toggelTheme());
  };

  const downloadHandler = () => {
    
    const csvData = Papa.unparse(items);
 
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    saveAs(blob, "expenses.csv");
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/auth");
  };

  return (
    <div className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Expense Tracker</div>
      </Link>
      <nav>
        <ul>
          {premium && (
            <li>
              <button onClick={toggleDarkModeHandler}>{`${
                isDarkMode ? '🔆' : '🌙'
              }`}</button>
              <button onClick={downloadHandler}>⬇</button>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
