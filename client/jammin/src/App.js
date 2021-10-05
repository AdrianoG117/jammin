import Topbar from "./components/Topbar/Topbar";
import FindJam from "./components/FindJam/FindJam";
import CreateJam from "./components/CreateJam/CreateJam.jsx";
import Home from "./components/Home/Home";
import EventPage from "./components/EventPage/EventPage";
import SignUp from "./components/Signup/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [jams, setJams] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [center, setCenter] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isSignedUp, setIsSignedUp] = useState(false);

  const [hasSearch, setHasSearch] = useState(false);

  useEffect(() => {
    setJams([]);
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <Topbar
            userData={userData}
            setUserData={setUserData}
            isSignedUp={isSignedUp}
            setIsSignedUp={setIsSignedUp}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Home
                  {...props}
                  jams={jams}
                  setJams={setJams}
                  setHasSearch={setHasSearch}
                />
              )}
            />
            <Route path="/createjam" exact component={CreateJam} />
            <Route
              path="/findjam"
              exact
              render={(props) => (
                <FindJam
                  {...props}
                  jams={jams}
                  setJams={setJams}
                  searchVal={searchVal}
                  setSearchVal={setSearchVal}
                  center={center}
                  setCenter={setCenter}
                  markers={markers}
                  setMarkers={setMarkers}
                  hasSearch={hasSearch}
                  setHasSearch={setHasSearch}
                  userData={userData}
                  setUserData={setUserData}
                  isSignedUp={isSignedUp}
                  setIsSignedUp={setIsSignedUp}
                />
              )}
            />
            <Route
              path="/jams/:id"
              exact
              render={(props) => (
                <EventPage
                  {...props}
                  userData={userData}
                  setUserData={setUserData}
                  isSignedUp={isSignedUp}
                  setIsSignedUp={setIsSignedUp}
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={(props) => (
                <SignUp
                  {...props}
                  userData={userData}
                  setUserData={setUserData}
                  isSignedUp={isSignedUp}
                  setIsSignedUp={setIsSignedUp}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={(props) => (
                <LogIn
                  {...props}
                  userData={userData}
                  setUserData={setUserData}
                  isSignedUp={isSignedUp}
                  setIsSignedUp={setIsSignedUp}
                />
              )}
            />
            <Route
              path="/dashboard"
              exact
              render={(...props) => (
                <Dashboard
                  {...props}
                
                  userData={userData}
                  setUserData={setUserData}
                  isSignedUp={isSignedUp}
                  setIsSignedUp={setIsSignedUp}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
