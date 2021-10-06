import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";
import { User } from "../../apiService/APIResponseTypes";


interface IProps {
  setCity: React.Dispatch< string >;//func passed in CreateJam
  setLocation: React.Dispatch< string >;//func passed in CreateJam
  searchJams: React.Dispatch< string >;//func passed from FindJam
  inputstyle: { //obj passed in CreateJam
    backgroundColor: string, 
    width: string, display: string, 
    justifyContent: string, margin: string, 
    height: string }; 
  inputcontainstyle: {  
    backgroundColor: string,  //obj passed in CreateJam
    color: string,
    height: string,
    width: string,
    margin: string,
    borderRadius: string,
    fontSize: string,
    padding: string,
   } 
  cityPlace: string;  //obj passed in CreateJam
  locPlace: string;    //obj passed in CreateJam
  findPlaceholder: string; //string passed in FindJam
}

const Search:React.FunctionComponent<IProps> = ({ setCity, setLocation, searchJams, inputstyle, inputcontainstyle, cityPlace, locPlace, findPlaceholder }:IProps) => {
  const { ready, value, suggestions: { status, data }, setValue, } = usePlacesAutocomplete();

  const handleInput = (event:React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleSelect = (val:string) => {  //is this correct??
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
    textAlign: "center" as "center",
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
