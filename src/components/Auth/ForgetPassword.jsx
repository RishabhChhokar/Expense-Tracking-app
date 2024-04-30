import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import "./ForgetPassword.css";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();

  const passwordHandler = async () => {
    const enteredEmail = emailInputRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: enteredEmail,
          }),
        }
      );

      if (response.ok) {
        alert("Password reset link sent to your email");
        navigate("/auth");
      } else {
        throw new Error("Error while sending password reset link");
      }
    } catch (error) {
      console.log(error);
      alert("Enter valid Email");
    }
  };

  return (
    <div className="forget-password">
      <div className="control">
        <label htmlFor="email">Enter your Email</label>
        <input type="email" id="email" required ref={emailInputRef} />
      </div>
      <button onClick={passwordHandler}>Reset Password</button>
    </div>
  );
};

export default ForgetPassword;
