/* eslint-disable import/no-webpack-loader-syntax */

//@ts-ignore
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "!mapbox-gl";
import { MapsContext } from "./MapsContext";
import { useReducer, useContext, useEffect } from "react";
import { MapsReducer } from "./MapsReducer";
import { PlacesContext } from "../places/PlacesContext";
import { directionApi } from "../../apis";
import { DirecctionResponse } from "../../interfaces/Direction";
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
  }, [Places]);
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
  ) => {
    const resp = await directionApi.get<DirecctionResponse>(
      `/${start.join(",")};${end.join(",")}`
    );
    const { distance, duration, geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;
    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms = kms / 100;
    const minutes = Math.floor(duration / 60);
    console.log({ kms, minutes });

    const bounds = new LngLatBounds(start, end);
    for (const coord of coords) {
      const newCord: [number, number] = [coord[0], coord[0]];
      bounds.extend(newCord);
    }
    state.map?.fitBounds(bounds, {
      padding: 200,
    });
    // polyline

    const sourceDate: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    /// todo remover poyline si existe

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }
    state.map?.addSource("RouteString", sourceDate);

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  };
  return (
    <MapsContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapsContext.Provider>
  );
};
