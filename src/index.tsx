import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MapApp from "./MapApp";

if (!navigator.geolocation) {
  alert("Tu nevegador no tiene opción de Gelocation");
  throw new Error("Tu negavedor no tiene opción de Geolocation");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapApp />
  </React.StrictMode>
);
