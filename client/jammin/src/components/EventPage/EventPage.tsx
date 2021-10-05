import React, { useState, useEffect, FunctionComponent } from "react";
import "./eventpage.css";
import { useHistory } from "react-router-dom";
import Social from "../Social/Social";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import apiService from "../../ApiService";
import Pin from "../../images/placeholder.png";
import Voice from "../../images/voice.png";
import moment from "moment";

const initialState = {
  name: "",
  message: "",
};

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function EventPage (props): FunctionComponent {
  const pathname = window.location.pathname;
  const urlID = pathname.slice(6);
  const [data, setData] = useState(props.location?.state?.jam);
  const [msg, setMsg] = useState(initialState); //message state
  const userData = props.userData;
  const setUserData = props.setUserData;
  const isSignedUp = props.isSignedUp;

  const history = useHistory();

  useEffect(() => {
    apiService.getEvent(urlID).then((data) => {
      setData(data[0]);
    });
  }, [msg]);

  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100%",
    height: "96%",
    borderRadius: "10px",
    marginBottom: "10px",
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const center = data?.locCords;
  // on click used to increment the participants going(number of participants)
  async function addToEvents(userid, jamid) {
    const body = {
      id: userid,
      jamId: jamid,
    };

    const idToSend = {
      id: jamid,
    };
    await apiService.addjam(body);
    await apiService.addParticipant(idToSend);
    setUserData((previous) => ({
      ...previous,
      comingEvents: [...previous.comingEvents, data],
    }));
    setData((previous) => {
      return {
        ...previous,
        numOfParticipants: previous.numOfParticipants + 1,
      };
    });
  }

  function isEventAdded(jamid) {
    const arr = userData.comingEvents;
    console.log("arrrr", arr);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === jamid) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="event-container">
      {data && (
        <>
          <div className="event-data">
            <div className="data-item" id="date">
              <h2>{moment(data.date).format("MMM Do, h:mm a")}</h2>
              {isSignedUp ? (
                isEventAdded(data._id) ? (
                  <button className="event-added-btn">EVENT ADDED</button>
                ) : (
                  <button
                    className="add-btn"
                    onClick={() => addToEvents(userData._id, data._id)}
                  >
                    PARTICIPATE
                  </button>
                )
              ) : (
                <button
                  className="add-btn"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login to participate
                </button>
              )}
            </div>
            <div className="data-item">
              <h1 id="title">{data.title}</h1>
              <p id="participants">{data.numOfParticipants} going</p>
            </div>
            <div className="data-item" id="location">
              <div className="img-container">
                <img className="pin-img" src={Pin} alt="" />
                <h2>{data.location}</h2>
              </div>
            </div>
            <div className="language-container">
              <div className="voice-icon-container">
                <img src={Voice} id="voice" alt="" />
              </div>
              <h2 className="data-item" id="languages">
                {data.languages}
              </h2>
            </div>
            <p className="data-item" id="description">
              {data.description}
            </p>
          </div>
          <div className="socialmap">
            <div className="map-container">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={15}
                center={center}
              >
                <Marker position={center} />
              </GoogleMap>
            </div>
            <Social
              jam={data}
              msg={msg}
              setMsg={setMsg}
              initialState={initialState}
              isSignedUp={isSignedUp}
              userData={userData}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default EventPage;

