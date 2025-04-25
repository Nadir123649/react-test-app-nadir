import React from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/css/index.css";
import "../src/assets/css/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "leaflet/dist/leaflet.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

