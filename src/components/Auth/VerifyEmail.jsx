import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const ignoreEmailHandler = () => {
    navigate("/");
  };

  const VerifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Verification link sent to your email");
        navigate("/");
      } else {
        throw new Error("Error occurred while sending verification email");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="verify-email">
        <button onClick={VerifyEmailHandler}>Verify Email</button>
        <button onClick={ignoreEmailHandler}>Ignore</button>
      </div>
    </>
  );
};

export default VerifyEmail;
