import React from "react";
import { useContext, useState } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import { LoadingPlaces } from "./LoadingPlaces";
import { MapsContext } from "../context/maps/MapsContext";
import { Feature } from "../interfaces/Places";

export const SearchResult = () => {
  const { Places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapsContext);
  const [active, setActive] = useState("d");
  const getRoute = (place: Feature) => {
    if (!userLocation) {
      return;
    }
    const [lng, lat] = place.center;

    getRouteBetweenPoints(userLocation, [lng, lat]);
  };

  if (Places.length === 0) {
    return <></>;
  }
  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }
  const onPlacerClicked = (place: Feature) => {
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 13,
      center: [lng, lat],
    });
    setActive(place.id);
  };

  return (
    <ul className="list-group mt-3">
      {Places.map((place) => (
        <li
          className={`list-group-item list-group-item-action pointer ${
            active === place.id ? "active" : ""
          }`}
          key={place.id}
          onClick={() => onPlacerClicked(place)}
        >
          <h6>{place.text_es}</h6>
          <p>{place.place_name_es}</p>{" "}
          <button
            className={`btn ${
              active === place.id
                ? " btn-outline-light"
                : " btn-outline-primary"
            }`}
            onClick={() => getRoute(place)}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
