import { useState, useRef, useContext } from "react";
import AuthContext from "../../Store/AuthContext";
import classes from "./AuthorizationForm.module.css";

const AuthorizationForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPassword2 = confirmPasswordInputRef.current.value;

    if (
      enteredEmail &&
      enteredPassword &&
      enteredPassword2 &&
      enteredPassword === enteredPassword2
    ) {
      setIsFormValid(true);
    } else {
      if (enteredPassword !== enteredPassword2) {
        setError("Passwords didn't match");
        console.log("Passwords didn't match");
      } else {
        setError("All Fields Are Required");
        console.log("All Fields Are Required");
      }
      return;
    }

    setIsLoading(true);
    let URL;
    if (isLogin && isFormValid) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0";
    } else {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0";
    }

    try {
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
        throw new Error("Authentication failed!");
      }

      const data = await response.json();
      authCtx.login(data.idToken);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      {error && <p style={{ color: "red", textAlign: "start" }}>*{error}</p>}
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
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "have an account? Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthorizationForm;
