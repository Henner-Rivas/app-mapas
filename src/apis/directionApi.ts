import axios from "axios";
export const directionApi = axios.create({
  baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving",
  params: {
    alternatives: false,
    geometries: "geojson",
    language: "es",

    steps: false,
    overview: "simplified",
    access_token:
      "pk.eyJ1IjoiaGVubmVyMSIsImEiOiJjbDhvbmg3MGMwMGN4M3VwanlrczV5bjhuIn0.x8mqNV8YJudX5sumyViUuQ",
  },
});
