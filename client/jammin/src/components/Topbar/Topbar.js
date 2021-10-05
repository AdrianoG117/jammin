import React from "react";
import "./topbar.css";
import { useHistory } from "react-router-dom";

function Topbar({ setUserData, isSignedUp, setIsSignedUp }) {
  const history = useHistory();

  return (
    <div className="nav-container">
      <div to="/" className="home-tag" onClick={() => history.push("/")} >
        <h2>Home</h2>
      </div>
      <div to="/createjam" className="menu-tag" onClick={() => history.push("/dashboard")} >
        <li>Create Jam</li>
      </div>
      <div to="/findjam" className="menu-tag" onClick={() => history.push("/dashboard")} >
        <li>Find Jam</li>
      </div>

      {isSignedUp ? (
        <ul className="navbar-right">
          <li className="nav-el" onClick={() => history.push("/dashboard")} >
            Dashboard
          </li>
          <li
            className="nav-el"
            onClick={() => {
              setUserData(null);
              setIsSignedUp(false);
              history.push("/login");
            }}
          >
            Log Out
          </li>
        </ul>
      ) : (
        <ul className="navbar-right">
          <li className="nav-el" onClick={() => history.push("/login")}>
            Login
          </li>
          <li className="nav-el" onClick={() => history.push("/signup")}>
            Sign up
          </li>
        </ul>
      )}
    </div>
  );
}

export default Topbar;
