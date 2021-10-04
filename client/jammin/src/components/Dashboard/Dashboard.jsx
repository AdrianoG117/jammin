import React, { useEffect } from 'react';
import MyJamsItem from '../MyJamsItem/MyJamsItem';
import './dashboard.css';

function Dashboard({ userData, setUserData }) {
  useEffect(() => {
    //sort events
    userData.comingEvents.sort(function (a, b) {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
  }, []);

  return (
    <div className="dashboard">
      {userData.comingEvents.length ? (
        <div className="dashboard-container">
          <h1>Hi there {userData.firstname} !</h1>
          <h2>Check out your upcoming events below: </h2>
          <div className="myevents-list">
            {userData.comingEvents.length
              ? userData.comingEvents.map((event) => (
                  <MyJamsItem
                    key={event._id}
                    eventData={event}
                    userData={userData}
                    setUserData={setUserData}
                  />
                ))
              : null}
          </div>
        </div>
      ) : (
        <div className="dashboard-container">
          <h1>Hi {userData.firstname}</h1>
          <h2>You have no jams added yet, go to the Find Jam section to find events around you</h2>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
