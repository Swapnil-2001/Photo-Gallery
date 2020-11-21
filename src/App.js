import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./comps/Login/Login";
import Dashboard from "./comps/Dashboard/Dashboard";
import "./index.css";
import { auth } from "./firebase/config";
import { useStateValue } from "./providers/StateProvider";

export default function App() {
  const [, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        });
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <div>
            <Dashboard />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
