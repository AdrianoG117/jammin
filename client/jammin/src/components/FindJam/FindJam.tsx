import React, { useState, SetStateAction } from "react";
import Search from "../Search/Search";
import JamItem from "../JamItem/JamItem";
import apiService from "../../apiService/ApiService";
import logo from "../../images/marker.png";
import "./findjam.css";
import { Jam } from "../../apiService/APIResponseTypes";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "60vh",
  borderRadius: "10px",
};

interface coords {
    lat: number
    lng: number
  }

interface IProps {
  jams:Jam[] | void;
  setJams: React.Dispatch<SetStateAction< Jam[] >>
  searchVal: string;
  // setSearch:
  setSearchVal: React.Dispatch<SetStateAction<string>>
  center: coords | null;
  setCenter: React.Dispatch<SetStateAction<coords | null>>
  markers: {lat: number, lng: number}[];
  setMarkers: React.Dispatch<SetStateAction<{lat: number, lng: number}[]>>
  hasSearch: boolean;
  setHasSearch: React.Dispatch<SetStateAction<boolean>>
  isSignedUp: boolean
}

const FindJam:React.FunctionComponent<IProps> = ({ jams, setJams, searchVal, setSearchVal, center, setCenter, markers, setMarkers, hasSearch, setHasSearch, isSignedUp }:IProps): React.ReactElement => {

  // const jams = props.jams;
  // console.log(jams);
  // const setJams = props.setJams;
  // const searchVal = props.searchVal;
  // const setSearchVal = props.setSearchVal;
  // const center = props.center;
  // const setCenter = props.setCenter;
  // const markers = props.markers;
  // const setMarkers = props.setMarkers;

  // const hasSearch = props.hasSearch;
  // const setHasSearch = props.setHasSearch;

  // const isSignedUp = props.isSignedUp;

  const [selected, setSelected] = useState<coords | null>(null);
  const [idRoute, setIdRoute] = useState<string | undefined>(undefined);
  const [highEvent, setHighEvent] = useState<coords | null>(null);

  const findPlaceholder = "Enter your city";

  function searchJams(input: string) {
    setSearchVal(input);
  }

  function getCoords(input: Jam[] | void): coords[] | void {
    if (input) {
      let result = [];
      for (let i = 0; i < input.length; i++) {
        result.push(input[i].locCords);
      }
      return result;
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const result: void | Jam[] = await apiService.getJams({ city: searchVal });
    setHasSearch(true);

    if (result) setJams(result);
    let eventsCoords = getCoords(result);
    if (eventsCoords) setMarkers(eventsCoords);

    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchVal}&key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        let coords = data.results[0].geometry.location;
        setCenter(coords);
      });
  }

  function coordsToId(coords: coords) {
    if (jams)
    for (let i = 0; i < jams.length; i++) {
      if (
        jams[i].locCords.lat === coords.lat &&
        jams[i].locCords.lng === coords.lng
      ) {
        return jams[i]._id;
      }
    }
  }

  const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey as string,
    libraries,
  });

  return (
    <div className="findJam-main">
      <form className="find-form" onSubmit={handleSubmit}>
        <Search searchJams={searchJams} findPlaceholder={findPlaceholder} />
        <button className="find-btn">Search</button>
      </form>
      <div className="jams-list-container">
        <div className="jams-list">
          {jams?.length
            ? jams.map((jam) => (
                <JamItem
                  jam={jam}
                  setHighEvent={setHighEvent}
                />
              ))
            : null}
        </div>
        <div className="maps-container">
          <div className="maps">
            {jams?.length ? (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center? center : {lat: 0, lng: 0}}
              >
                {markers.map((marker) => (
                  <Marker
                    onClick={() => {
                      setSelected(marker);
                      const routeId = coordsToId({
                        lat: marker.lat,
                        lng: marker.lng,
                      });
                      setIdRoute(routeId);
                    }}
                    position={{ lat: marker.lat, lng: marker.lng + 0.0034 }}
                    icon={{
                      url: logo,
                      scaledSize:
                        marker.lat === highEvent?.lat &&
                        marker.lng === highEvent?.lng
                          ? new window.google.maps.Size(50, 50)
                          : new window.google.maps.Size(40, 40),
                    }}
                  />
                ))}

                {selected ? (
                  <InfoWindow
                    position={{
                      lat: selected.lat,
                      lng: selected.lng,
                    }}
                    onCloseClick={() => {
                      setSelected(null);
                    }}
                  >
                    <Link to={`/jams/${idRoute}`}>
                      <button className="btn-see-event">SEE EVENT</button>
                      <div className="map-window"></div>
                    </Link>
                  </InfoWindow>
                ) : null}
              </GoogleMap>
            ) : null}
          </div>
        </div>
      </div>
      <div className="error-container">
        {jams?.length === 0 && hasSearch ? (
          <div className="msg-fail">
            <h1 id="search-fail">
              OOPS it seems there is no jams coming up in this city 😅
            </h1>
            <Link to="/createjam">
              <button id="btn-fail">Create a jam</button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default FindJam;
