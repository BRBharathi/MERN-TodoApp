import React from "react";
import ReactDOM from "react-dom/client";
//import "./Styles/TodoStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { AuthContext, AuthProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
