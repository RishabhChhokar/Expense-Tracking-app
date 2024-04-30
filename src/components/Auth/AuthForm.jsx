import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";
import VerifyEmail from "./VerifyEmail";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState();

  const swithcAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    try {
      if (!isLogin) {
        const enteredPassword2 = confirmPasswordInputRef.current.value;
        if (
          enteredEmail &&
          enteredPassword &&
          enteredPassword2 &&
          enteredPassword === enteredPassword2
        ) {
          setIsFormValid(true);
        } else if (enteredPassword !== enteredPassword2) {
          setError("Passwords didn't match");
          console.log("Passwords didn't match");
          return;
        } else {
          setError("All Fields Are Required");
          console.log("All Fields Are Required");
          return;
        }
      }

      setIsLoading(true);
      let URL;
      if (isLogin) {
        URL =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0";
      } else if (isFormValid) {
        URL =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0";
      }

      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Authentication failed!";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      authCtx.login(data.idToken, data.email);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section className={classes.auth}>
      {authCtx.isLoggedIn ? (
        <VerifyEmail />
      ) : (
        <div>
          {error && (
            <p style={{ color: "red", textAlign: "start" }}>*{error}</p>
          )}
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.control}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div className={classes.control}>
              {isLogin && (
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    required
                    ref={passwordInputRef}
                  />
                </div>
              )}
              {!isLogin && (
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    required
                    ref={passwordInputRef}
                  />
                  <label htmlFor="password">confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    ref={confirmPasswordInputRef}
                  />
                </div>
              )}
            </div>
            {isLogin && (
              <div className={classes.link}>
                <Link style ={{color : "red"}} to="/forget-password">Forgot Password?</Link>
              </div>
            )}
            <div className={classes.actions}>
              {!isLoading && (
                <button>{isLogin ? "Login" : "Create Account"}</button>
              )}
              {isLoading && <p>Sending request...</p>}
              <button
                type="button"
                className={classes.toggle}
                onClick={swithcAuthModeHandler}
              >
                {isLogin ? "Create new account" : "have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default AuthForm;
