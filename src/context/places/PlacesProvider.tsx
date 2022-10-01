import React, { useReducer, useEffect } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesPeducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import searchApi from "../../apis/searchApi";
import { Feature, PlacesResponse } from "../../interfaces/Places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  Places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: true,
  Places: [],
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

  const seachPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({type:"setPlaces",payload:[]})
      return [];
    }
    if (!state.userLocation) throw Error("No hay ubicación del usuario");

    dispatch({ type: "setLoadingPlaces" });
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });
    dispatch({ type: "setPlaces", payload: resp.data.features });
    return resp.data.features;
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
