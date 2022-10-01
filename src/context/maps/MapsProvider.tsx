import { Map, Marker, Popup } from "mapbox-gl";
import { MapsContext } from "./MapsContext";
import { useReducer, useContext, useEffect } from "react";
import { MapsReducer } from "./MapsReducer";
import { PlacesContext } from "../places/PlacesContext";
export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}
const initialState: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const MapsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapsReducer, initialState);
  const { Places } = useContext(PlacesContext);
  useEffect(() => {
    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of Places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
            <h6>${place.text_es}</h6>
            <p>${place.place_name_es}</p>
          `);
      const newMaker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(state.map!);

      newMarkers.push(newMaker);
    }

    dispatch({ type: "setMarkers", payload: newMarkers });
  }, [Places, state.map, state.markers]);
  const setMap = (map: Map) => {
    const myLocationPopup = new Popup().setHTML(`
      <h4>Aqui estoy</h4>
      <p>en algún lugar del mundo</p>
     `);

    new Marker({ color: "#61DAFB" })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);
    dispatch({ type: "setMap", payload: map });
  };
  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {};
  return (
    <MapsContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapsContext.Provider>
  );
};
