import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./StartingPageContent.module.css";
import ExpenseTracker from "../ExpenseTracker/ExpenseTracker";
const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const profileHandler = () => {
    navigate("./profile");
  };

  return (
    <>
      {authCtx.isLoggedIn ? (
        <div>
          <section className={classes.starting}>
            <p style={{textAlign : "center",paddingTop : "5px",margin : "0px"}}>Welcome to Expense Tracker.</p>
            <div className="classes.profile">
              <p style={{margin : "0px"}}>
                Your profile is incomplete.
                <button style={{marginLeft : "20px", color : "white", backgroundColor :"darkblue"}} onClick={profileHandler}>Complete Now</button>
              </p>
            </div>
          </section>
          <ExpenseTracker />
        </div>
      ) : (
        <h1>Welcome to Expense Tracker.</h1>
      )}
    </>
  );
};

export default HomePage;
