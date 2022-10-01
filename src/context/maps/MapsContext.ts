/* eslint-disable import/no-webpack-loader-syntax */

//@ts-ignore
import { Map } from "!mapbox-gl";
import { createContext } from "react";

interface MapsContextProps {
  isMapReady: boolean;
  map?: Map;
  getRouteBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
  //methos

  setMap: (map: Map) => void;
}
export const MapsContext = createContext({} as MapsContextProps);
