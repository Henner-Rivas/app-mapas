import { Map, Marker } from "mapbox-gl";
import { MapState } from "./MapsProvider";

type MapAction =
  | { type: "setMap"; payload: Map }
  | { type: "setMarkers"; payload: Marker[] };

export const MapsReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    case "setMarkers":
      return {
        ...state,
        markers: action.payload,
      };

    default:
      return state;
  }
};
