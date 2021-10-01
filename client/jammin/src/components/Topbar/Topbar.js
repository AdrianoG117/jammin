import React from 'react';
import { Link } from 'react-router-dom';
import './topbar.css';
import { useHistory } from 'react-router-dom';

function Topbar({ setUserData, isSignedUp, setIsSignedUp }) {
  const history = useHistory();

  return (
    <div className="nav-container">
      <Link to="/" className="home-tag">
        <h2>Home</h2>
      </Link>
      <Link to="/createjam" className="menu-tag">
        <li>Create Jam</li>
      </Link>
      <Link to="/findjam" className="menu-tag">
        <li>Find Jam</li>
      </Link>

      {isSignedUp ? (
        <ul className="navbar-right">
          <li className="nav-el" onClick={() => history.push(`/dashboard`)}>
            Dashboard
          </li>
          <li
            className="nav-el"
            onClick={() => {
              setUserData(null);
              setIsSignedUp(false);
              history.push(`/login`);
            }}
          >
            Log Out
          </li>
        </ul>
      ) : (
        <ul className="navbar-right">
          <li className="nav-el" onClick={() => history.push(`/login`)}>
            Login
          </li>
          <li className="nav-el" onClick={() => history.push(`/signup`)}>
            Sign up
          </li>
        </ul>
      )}
    </div>
  );
}

export default Topbar;
