import { Map } from "mapbox-gl";
import { MapState } from "./MapsProvider";

type MapAction = { type: "setMap"; payload: Map };

export const MapsReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case "setMap":
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };

    default:
      return state;
  }
};
