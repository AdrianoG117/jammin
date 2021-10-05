import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

function Search({
  setCity,
  setLocation,
  searchJams,
  inputstyle,
  inputcontainstyle,
  cityPlace,
  locPlace,
  findPlaceholder,
}) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
    if (setCity) {
      setCity(val);
    }
    if (setLocation) {
      setLocation(val);
    }
    if (searchJams) {
      searchJams(val);
    }
  };

  const style = {
    width: "100%",
    height: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "20px",
    color: "white",
    padding: "1rem",
    textAlign: "center",
  };

  const containerStyle = {
    height: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Combobox
      style={inputstyle ? inputstyle : containerStyle}
      onSelect={handleSelect}
      aria-labelledby="demo"
    >
      <ComboboxInput
        required
        style={inputcontainstyle ? inputcontainstyle : style}
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={cityPlace || locPlace || findPlaceholder}
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

export default Search;
