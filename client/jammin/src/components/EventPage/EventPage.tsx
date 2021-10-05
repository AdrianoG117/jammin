import { useState, useEffect, FunctionComponent } from "react";
// import * as React from "react";
import "./eventpage.css";
import { useHistory } from "react-router-dom";
import Social from "../Social/Social";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import apiService from "../../apiService/ApiService";
import Pin from "../../images/placeholder.png";
import  Voice from  "../../images/voice.png";
import moment from "moment";
import {Message, Jam, User} from "../../apiService/APIResponseTypes";

const initialState:Message = {
  name: "",
  message: "",
};



const initialJamState: Jam ={
   title: "",
  date: "",
  description: "",
  city: "",
  cityCords: {lat: 0, lng:0},
  location: "",
  locCords: {lat: 0, lng:0},
  host: "",
  numOfParticipants: 1,
  languages: "",
  pastEvent: false,
  comingEvent: true,
  messages: [],
};


interface IProps {
  userData: User 
  setUserData: React.Dispatch<React.SetStateAction< User>>
  isSignedUp: boolean
  // setIsSignedUp:  React.Dispatch<React.SetStateAction<boolean>>
}


const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const EventPage:FunctionComponent<IProps>= ({userData,setUserData,isSignedUp}:IProps) => {
  const pathname = window.location.pathname;
  const urlID = pathname.slice(6);
  const [data, setData] = useState(initialJamState);
  const [msg, setMsg] = useState(initialState); //message state

   
  const history = useHistory();

  useEffect(() => {
    apiService.getEvent(urlID)
    .then((data) => {
      if(data){
        setData(data[0]);
      }
    })
    .finally(()=>{});
  }, [msg, urlID]);

  const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];
  const mapContainerStyle = {
    width: "100%",
    height: "96%",
    borderRadius: "10px",
    marginBottom: "10px",
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey as string,
    libraries,
  });

  const center = data?.locCords;
  // on click used to increment the participants going(number of participants)
  async function addToEvents(userId: string | undefined, jamId: string | undefined): Promise<void> {
    if(typeof userId === "string" && typeof jamId === "string") {
      const body = {
      id: userId,
      jamId: jamId,
    };
      apiService.addJam(body);
    await apiService.addParticipant(jamId);
    
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
    
    
   
  }

  function isEventAdded(jamid:string | undefined) {
    if(userData && typeof jamid === "string"){
      const arr = userData.comingEvents;      
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id === jamid) {
        return true;
      }
    }
    return false;
    }
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
                    onClick={() => addToEvents(userData._id , data._id)}
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
              setUserData={setUserData}          />
          </div>
        </>
      )}
    </div>
  );
};

export default EventPage;

