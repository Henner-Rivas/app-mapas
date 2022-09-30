import React, { useReducer, useEffect } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesPeducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import searchApi from "../../apis/searchApi";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};
interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);
  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  const seachPlacesByTerm = async (query: string) => {
    if (query.length === 0) return [];
    if (!state.userLocation) return;

    console.log("llegue" + query);
    const resp = await searchApi.get(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });
    console.log(resp.data);
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        seachPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
