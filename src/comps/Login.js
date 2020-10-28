import React, { useContext, useEffect } from "react";
import { signInWithGoogle, auth } from "../firebase/config";
import { UserContext } from "../providers/UserProvider";
import Search from "../images/search.png";
import { useHistory } from "react-router-dom";

export default function Login() {
  const user = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    if (user) {
      localStorage.setItem("user_id", auth.currentUser.uid);
      history.push("/dashboard");
    }
  }, [history, user]);

  return (
    <div className="login-buttons">
      <div className="login-provider-button" onClick={signInWithGoogle}>
        <img className="google-logo" src={Search} alt="google icon" />
        <span> Continue with Google</span>
      </div>
    </div>
  );
}
