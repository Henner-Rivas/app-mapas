import { Map, Marker, Popup } from "mapbox-gl";
import { MapsContext } from "./MapsContext";
import { useReducer } from "react";
import { MapsReducer } from "./MapsReducer";
export interface MapState {
  isMapReady: boolean;
  map?: Map;
}
const initialState: MapState = {
  isMapReady: false,
  map: undefined,
};
interface Props {
  children: JSX.Element | JSX.Element[];
}
export const MapsProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapsReducer, initialState);

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
  return (
    <MapsContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapsContext.Provider>
  );
};
