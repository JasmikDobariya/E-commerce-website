import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { AuthProvider } from "./Creatcontext/DataBackend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
  </AuthProvider>
);

reportWebVitals();
