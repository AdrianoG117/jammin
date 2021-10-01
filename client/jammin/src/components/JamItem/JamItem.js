import React from 'react';
import './JamItem.css';
import { Link } from 'react-router-dom';
import moment from 'moment';

function JamItem({ jam,setHighEvent }) {
  return (
    <div
      onMouseEnter={() => {
        setHighEvent(jam.locCords);
      }}
      onMouseLeave={() => {
        setHighEvent(null);
      }}
    >
      <div className="single-jam">
        <div className="jam-info">
          <h1>{moment(jam.date).format('MMM Do, h:mm a')}</h1>
          <h1>{jam.title}</h1>
          <div className="jam-loc">
            <img src="" alt="" />
            <p>{jam.location}</p>
          </div>
        </div>
        <div className="see-event">
          <Link
            to={{
              pathname: `/jams/${jam._id}`,
              state: {
                jam: jam,
              },
            }}
          >
            <button>SEE EVENT</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JamItem;
