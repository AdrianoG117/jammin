import {FunctionComponent} from "react";
import "./JamItem.css";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {Jam} from "../../apiService/APIResponseTypes";

type cords = { lat: number
    lng: number} | null

interface IProps{
  jam: Jam
 setHighEvent: React.Dispatch<React.SetStateAction< cords>>
}


const JamItem:FunctionComponent<IProps> = ({ jam,setHighEvent }) => {
  const history = useHistory();
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
          <h1>{moment(jam.date).format("MMM Do, h:mm a")}</h1>
          <h1>{jam.title}</h1>
          <div className="jam-loc">
            <img src="" alt="" />
            <p>{jam.location}</p>
          </div>
        </div>
        <div className="see-event" >
            <button onClick={()=> history.push({
              pathname: `/jams/${jam._id}`,
              state: {
                jam:jam
              }
            })}>SEE EVENT</button>
          
        </div>
      </div>
    </div>
  );
}

export default JamItem;
