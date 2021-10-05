import React, { useState } from "react";
import Search from "../Search/Search";
import apiService from "../../apiService/ApiService";
import "./createjam.css";
import { useHistory } from "react-router-dom";
import { useLoadScript } from "@react-google-maps/api";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const initialState = {
  title: "",
  date: "",
  description: "",
  city: "",
  cityCords: null,
  location: "",
  locCords: null,
  host: "",
  numOfParticipants: 1,
  languages: "",
  pastEvent: false,
  comingEvent: true,
  messages: [],
};

function CreateJam() {
  const [state, setState] = useState(initialState);
  
  const history = useHistory();

  const libraries = ["places"];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";


  function handleChange(e) {
    const { name, value } = e.target;
    setState((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const event = await apiService.postEvent(state); //make the function return the event, await that
    const id = event._id;
    setState(initialState);
    history.push(`/jams/${id}`); //path with id
  }
// We can remove this setCity function/input
//setLocation is making fetch call that return the city location. data.results[0].formatted_address.
  function setCity(loc) {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const coords = data.results[0].geometry.location;
        console.log(data);
        setState((previous) => ({
          ...previous,
          city: loc,
          cityCords: coords,
        }));
      });
  }

  function setLocation(loc) {
    //add city info
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        const coords = data.results[0].geometry.location;
        setState((previous) => ({
          ...previous,
          location: loc,
          locCords: coords,
        }));
      })
      .catch();
  }

  const placeHolders = {
    city: "YOUR CITY",
    location: "JAM LOCATION",
  };

  const inputstyle = {
    backgroundColor: "transparent",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "1rem",
    height: "14%",
  };

  const inputcontainstyle = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    height: "110%",
    width: "60%",
    margin: "0 auto",
    borderRadius: "20px",
    fontSize: "1.2rem",
    padding: "0.4rem",
  };

  return (
    <div className="createJam-main">
      <form className="jam-form" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="TITLE"
          name="title"
          value={state.title}
          onChange={handleChange}
          className="event-input main-inputs"
        />
        <input
          required
          type="datetime-local"
          placeholder="DATE"
          name="date"
          value={state.date}
          onChange={handleChange}
          className="event-input main-inputs"
        />
        <Search
          inputstyle={inputstyle}
          inputcontainstyle={inputcontainstyle}
          setCity={setCity}
          cityPlace={placeHolders.city}
        />
        <Search
          inputstyle={inputstyle}
          inputcontainstyle={inputcontainstyle}
          setLocation={setLocation}
          state={state}
          locPlace={placeHolders.location}
        />
        <input
          required
          type="text"
          placeholder="LANGUAGES SPOKEN ?"
          name="languages"
          value={state.languages}
          onChange={handleChange}
          className="event-input main-inputs"
        />
        <textarea
          required
          className="event-input"
          name="description"
          id="event-description"
          placeholder="DESCRIPTION OF YOUR JAM"
          value={state.description}
          onChange={handleChange}
          cols="30"
          rows="10"
        ></textarea>
        <button className="create-btn">CREATE MY EVENT</button>
      </form>
    </div>
  );
}

export default CreateJam;
