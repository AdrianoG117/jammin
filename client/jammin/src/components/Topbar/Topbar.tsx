import React, { SetStateAction } from "react";
import "./topbar.css";
import { useHistory } from "react-router-dom";
import { User } from "../../apiService/APIResponseTypes";
import { initialUserState } from "../../App";

interface IProps {
  setUserData: React.Dispatch<SetStateAction< User >>; 
  setIsSignedUp: React.Dispatch<SetStateAction<boolean>>;
  isSignedUp: boolean;
}

const Topbar:React.FunctionComponent<IProps> = ({ setUserData, setIsSignedUp, isSignedUp }:IProps) => {
  const history = useHistory();

  return (
    <div className="nav-container">
      <div className="home-tag" onClick={() => history.push("/")} 
        role={"button"}
        tabIndex={0}
        onKeyDown={() => history.push("/")}
      >
        <h2>Home</h2>
      </div>
      <div className="menu-tag" 
      >
        <li onClick={() => history.push("/createjam")}
        role={"presentation"}
        // tabIndex={0}
        onKeyDown={() => history.push("/createjam")}
        >Create Jam</li>
      </div>
      <div className="menu-tag" onClick={() => history.push("/findjam")}
      role={"button"}
      tabIndex={0}
      onKeyDown={() => history.push("/findjam")}
      >
        <li>Find Jam</li>
      </div>

      {isSignedUp ? (
        <ul className="navbar-right">
          <li className="nav-el" onClick={() => history.push("/dashboard")} 
          role={"presentation"}
          // tabIndex={0}
          onKeyDown={() => history.push("/dashboard")}
          >
            Dashboard
          </li>
          <li
            className="nav-el"
              onClick={() => {
              setUserData(initialUserState);
              setIsSignedUp(false);
              history.push("/login");
            }}
            role={"presentation"}
            onKeyDown={() => history.push("/login")}
          >
            Log Out
          </li>
        </ul>
      ) : (
        <ul className="navbar-right">
          <li className="nav-el" onClick={() => history.push("/login")}
          role={"presentation"}
          onKeyDown={() => history.push("/login")}
          >
            Login
          </li>
          <li className="nav-el" onClick={() => history.push("/signup")}
            role={"presentation"}
            onKeyDown={() => history.push("/signup")}>
            Sign up
          </li>
        </ul>
      )}
    </div>
  );
};

export default Topbar;
