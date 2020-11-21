import React, { useEffect } from "react";
import { signInWithGoogle, auth } from "../../firebase/config";
import { useStateValue } from "../../providers/StateProvider";
import Search from "../../images/search.png";
import { useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [{ user }] = useStateValue();
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
