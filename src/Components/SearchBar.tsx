import { useRef, ChangeEvent, useContext } from "react";
import { PlacesContext } from "../context";

export const SearchBar = () => {
  const ref = useRef<NodeJS.Timeout>();
  const { seachPlacesByTerm } = useContext(PlacesContext);
  const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => {
      seachPlacesByTerm(event.target.value);
    }, 500);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar"
        onChange={onQueryChanged}
      />
    </div>
  );
};
