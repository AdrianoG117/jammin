import React, { useState } from 'react';
import Search from '../Search/Search';
import apiService from '../../ApiService';
import './createjam.css';
import { useHistory } from 'react-router-dom';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const initialState = {
  title: '',
  date: '',
  description: '',
  city: '',
  cityCords: null,
  location: '',
  locCords: null,
  host: '',
  numOfParticipants: 1,
  languages: '',
  pastEvent: false,
  comingEvent: true,
  messages: [],
};

function CreateJam() {
  const [state, setState] = useState(initialState);
  //
  const history = useHistory();
  //use this setState to upade  the location

  function handleChange(e) {
    const { name, value } = e.target;
    console.log(`${name}, ${value}`);
    setState((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const event = await apiService.postEvent(state); //make the function return the event, await that
    console.log('event data back from API ', event);
    const id = event._id;
    setState(initialState);
    history.push(`/jams/${id}`); //path with id
  }

  function setCity(loc) {
    console.log('setCity function running');
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // console.log(data.results[0].geometry.location);
        let coords = data.results[0].geometry.location;
        setState((previous) => ({
          ...previous,
          city: loc,
          cityCords: coords,
        }));
      });
  }

  function setLocation(loc) {
    console.log('setLocation function running');

    //HERE WE WANNA GET THE COORDINATES FOR LOC
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results[0].geometry.location);
        let coords = data.results[0].geometry.location;
        setState((previous) => ({
          ...previous,
          location: loc,
          locCords: coords,
        }));
      })
      .catch((err) => console.log(err));
  }

  const placeHolders = {
    city: 'YOUR CITY',
    location: 'JAM LOCATION',
  };

  const inputstyle = {
    backgroundColor: 'transparent',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem',
    height: '14%',
  };

  const inputcontainstyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    height: '110%',
    width: '60%',
    margin: '0 auto',
    borderRadius: '20px',
    fontSize: '1.2rem',
    padding: '0.4rem',
    // textAlign: 'center'
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
        {/* <div className="search-city"> */}
        <Search
          inputstyle={inputstyle}
          inputcontainstyle={inputcontainstyle}
          setCity={setCity}
          cityPlace={placeHolders.city}
        />
        {/* </div> */}
        {/* <div className="search-city"> */}
        <Search
          inputstyle={inputstyle}
          inputcontainstyle={inputcontainstyle}
          setLocation={setLocation}
          state={state}
          locPlace={placeHolders.location}
        />
        {/* </div> */}
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
        <button class="create-btn">CREATE MY EVENT</button>
      </form>
    </div>
  );
}

export default CreateJam;
