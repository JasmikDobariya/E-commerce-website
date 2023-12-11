import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import { FirebaseProvider } from "./Creatcontext/Firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </FirebaseProvider>
);

reportWebVitals();
