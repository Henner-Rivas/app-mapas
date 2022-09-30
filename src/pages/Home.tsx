import React, { useRef } from "react";
import { BtnMyLocation, MapView, SearchBar } from "../Components";
import ReactLogo from "../Components/ReactLogo";

export const Home = () => {
  return (
    <div>
      <MapView />
      <BtnMyLocation />
      <ReactLogo />
      <SearchBar />
    </div>
  );
};
