import {FunctionComponent} from "react";
import "./myjamsitem.css";
import moment from "moment";
import Trash from "../../images/trash.png";
import apiService from "../../apiService/ApiService";
import { useHistory } from "react-router-dom";
import {Message, Jam, User} from "../../apiService/APIResponseTypes";

interface IProps {
  userData: User
  eventData: Jam
  setUserData: React.Dispatch<React.SetStateAction< User>>
}

const  MyJamsItem:FunctionComponent<IProps> = ({ eventData, userData, setUserData }:IProps) => {
  const history = useHistory();
  
  async function removeFromEvents(userId: string | undefined, jamId: string | undefined) {
   if(typeof userId === "string" && typeof jamId === "string") {
      const body = {
      id: userId,
      jamId: jamId,
    };
  
    apiService.removeJam(body);
    await apiService.removeParticipant(jamId);

    //send back from post request
    const filteredEvents = userData.comingEvents.filter(function (event) {
      return event._id !== jamId;
    });
    setUserData((previous) => {
      return { ...previous, comingEvents: filteredEvents };
    });
  }
  }

  return (
    <div className="jamsitem-container">
      <div className="date">
        <h2>{moment(eventData.date).format("MMM Do")}</h2>
      </div>
      <div className="item-main">
        <h1>{eventData.title}</h1>
        <h2>{eventData.city}</h2>
      </div>
      <div className="button-container">
          <button onClick={() => history.push(`/jams/${eventData._id? eventData._id : ""}`)} id="see-btn">See Event</button> 
      </div>
      <div className="trash-container" 
            role={"button"}
            tabIndex={0} 
            onClick={() => removeFromEvents(userData._id, eventData._id)}
            onKeyDown={() => removeFromEvents(userData._id, eventData._id)}>
        <img
          src={Trash}
          alt=""
        />
      </div>
    </div>
  );
};

export default MyJamsItem;
