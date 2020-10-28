import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./comps/Login";
import UserProvider from "./providers/UserProvider";
import Dashboard from "./comps/Dashboard";
import "./index.css";

export default function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
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
        </div>
      </Router>
    </UserProvider>
  );
}
