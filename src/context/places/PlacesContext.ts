import { createContext } from "react";
import { Feature } from "../../interfaces/Places";

export interface placesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  seachPlacesByTerm: (query: string) => Promise<Feature[]>;
  isLoadingPlaces: boolean;
  Places: Feature[];
}

export const PlacesContext = createContext<placesContextProps>(
  {} as placesContextProps
);
