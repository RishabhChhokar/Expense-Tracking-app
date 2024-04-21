import { useRef, useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const fullNameInputRef = useRef();
  const profileUrlInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");

  const cancelHandler = () => {
    navigate("/");
  };

  const updateProfile = (event) => {
    event.preventDefault();

    const enteredName = fullNameInputRef.current.value;
    const enteredPhotoURL = profileUrlInputRef.current.value;

    fetch(
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
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fullNameInputRef.current.value = "";
    profileUrlInputRef.current.value = "";
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDBW667VYqKhnmvuSiUVDTGGlNQMVYDHT0`,
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
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        if (data.users && data.users.length > 0) {
          
          const user = data.users[0];
          setFullName(user.displayName || "");
          setProfileUrl(user.photoUrl || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [authCtx.token]);

  return (
    <div>
      <form className={classes.form} onSubmit={updateProfile}>
        <div className={classes.control}>
          <label htmlFor="full-name">Full Name</label>
          <input
            type="text"
            id="full-name"
            ref={fullNameInputRef}
            required
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="photot-url">Profile Photo URL</label>
          <input
            type="text"
            id="photot-url"
            ref={profileUrlInputRef}
            required
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
          />
        </div>
        <div className={classes.action}>
          <button type="submit" className={classes.update}>
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
