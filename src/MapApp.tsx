import React from "react";
import { MapsProvider, PlacesProvider } from "./context";
import { Home } from "./pages";

const MapApp = () => {
  return (
    <PlacesProvider>
      <MapsProvider>
        <Home />
      </MapsProvider>
    </PlacesProvider>
  );
};

export default MapApp;
