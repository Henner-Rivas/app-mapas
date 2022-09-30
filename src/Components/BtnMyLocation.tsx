import React from "react";
import { useContext } from "react";
import { MapsContext } from "../context/maps/MapsContext";
import { PlacesContext } from "../context/index";

export const BtnMyLocation = () => {
  const { map, isMapReady } = useContext(MapsContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    if (!isMapReady) throw new Error("Mapa no esta listo");
    if (!userLocation) throw new Error("Mapa no esta listo");

    map?.flyTo({
      zoom: 15,
      center: userLocation,
    });
  };
  return (
    <button
      className="btn btn-primary"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 99,
      }}
      onClick={onClick}
    >
      {" "}
      Mi ubicación
    </button>
  );
};
