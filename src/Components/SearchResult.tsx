import React from "react";
import { useContext } from "react";
import { PlacesContext } from "../context/places/PlacesContext";
import { LoadingPlaces } from "./LoadingPlaces";

export const SearchResult = () => {
  const { Places, isLoadingPlaces } = useContext(PlacesContext);

  if (Places.length === 0) {
    return <></>;
  }
  if (isLoadingPlaces) {
    return <LoadingPlaces />;
  }
  return (
    <ul className="list-group mt-3">
      {Places.map((place) => (
        <li className="list-group-item list-group-item-action" key={place.id}>
          <h6>{place.text_es}</h6>
          <p>{place.place_name_es}</p>{" "}
          <button className="btn btn-outline-primary">Direcciones</button>
        </li>
      ))}
    </ul>
  );
};
