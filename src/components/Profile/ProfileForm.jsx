import { useRef, useContext, useEffect } from "react";

import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const fullNameInputRef = useRef();
  const profileUrlInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: authCtx.token,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        const userData = data.users[0];
        fullNameInputRef.current.value = userData.displayName;
        profileUrlInputRef.current.value = userData.photoUrl;
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [authCtx.token]);

  const cancelHandler = () => {
    navigate("/");
  };

  const updateProfile = async (event) => {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredPhotoURL = profileUrlInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: authCtx.token,
            displayName: enteredName,
            photoUrl: enteredPhotoURL,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    fullNameInputRef.current.value = "";
    profileUrlInputRef.current.value = "";
  };

  return (
    <div>
      <form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="full-name">Full Name</label>
          <input type="text" id="full-name" ref={fullNameInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="photot-url">Profile Photo URL</label>
          <input
            type="text"
            id="photo-url"
            ref={profileUrlInputRef}
            required
          />
        </div>
        <div className={classes.action}>
          <button onClick={updateProfile} className={classes.update}>
            Update
          </button>
        </div>
      </form>
      <button onClick={cancelHandler} className={classes.cancel}>
        Cancel
      </button>
    </div>
  );
};

export default ProfileForm;
