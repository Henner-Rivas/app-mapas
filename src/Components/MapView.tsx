/* eslint-disable import/no-webpack-loader-syntax */
import { useContext, useRef, useLayoutEffect } from "react";
import { MapsContext, PlacesContext } from "../context";

//@ts-ignore
import { Map } from "!mapbox-gl";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapsContext);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: ref.current!, // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 10,
      });
      /*      map.on("style.load", () => {
        map.setFog({}); // Set the default atmosphere style
      }); */
      setMap(map);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, userLocation]);

  if (isLoading) {
    return (
      <div className="loading_map">
        <h4>Espere por favor</h4>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div ref={ref} className="map-view">
      <p>
        {userLocation?.[0]} - {userLocation?.[1]}
      </p>
    </div>
  );
};
