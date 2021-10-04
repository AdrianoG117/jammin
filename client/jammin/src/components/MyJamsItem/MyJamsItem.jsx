import React from 'react';
import './myjamsitem.css';
import moment from 'moment';
import Trash from '../../images/trash.png';
import apiService from '../../ApiService';
import { useHistory } from 'react-router-dom';


function MyJamsItem({ eventData, userData, setUserData }) {
  const history = useHistory();
  async function removeFromEvents(userid, jamid) {
    const body = {
      id: userid,
      jamId: jamid,
    };
    const idToSend = {
      id: jamid,
    };
    await apiService.removejam(body);
    await apiService.removeParticipant(idToSend);

    //send back from post request
    const filteredEvents = userData.comingEvents.filter(function (event) {
      return event._id !== jamid;
    });
    setUserData((previous) => {
      return { ...previous, comingEvents: filteredEvents };
    });
  }

  return (
    <div className="jamsitem-container">
      <div className="date">
        <h2>{moment(eventData.date).format('MMM Do')}</h2>
      </div>
      <div className="item-main">
        <h1>{eventData.title}</h1>
        <h2>{eventData.city}</h2>
      </div>
      <div className="button-container">
        <div onClick={() => history.push(`/jams/${eventData._id}`)}>
          <button id="see-btn">See Event</button>
        </div>
      </div>
      <div className="trash-container">
        <img
          src={Trash}
          alt=""
          onClick={() => removeFromEvents(userData._id, eventData._id)}
        />
      </div>
    </div>
  );
}

export default MyJamsItem;
