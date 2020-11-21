import React from "react";
import ReactDOM from "react-dom";
import StateProvider from "./providers/StateProvider";
import reducer, { initialState } from "./reducers/reducers";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  rootElement
);
