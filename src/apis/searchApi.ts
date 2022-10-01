import axios from "axios";
const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    zoom: 2,
    limit: 3,
    language: "es",
    access_token:
      "pk.eyJ1IjoiaGVubmVyMSIsImEiOiJjbDhvbmg3MGMwMGN4M3VwanlrczV5bjhuIn0.x8mqNV8YJudX5sumyViUuQ",
  },
});

export default searchApi;
