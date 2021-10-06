import Topbar from "./components/Topbar/Topbar";
import FindJam from "./components/FindJam/FindJam";
import CreateJam from "./components/CreateJam/CreateJam";
import Home from "./components/Home/Home";
import EventPage from "./components/EventPage/EventPage";
import SignUp from "./components/Signup/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";
import React, { useState, useEffect, SetStateAction } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Jam, User } from "./apiService/APIResponseTypes";

export const initialUserState: User = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  pastEvents: [],
  comingEvents: [],
};

const App:React.FunctionComponent = () => {
  const [jams, setJams] = useState<Jam[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const [center, setCenter] = useState< { lng:number, lat:number } | null >(null);
  const [markers, setMarkers] = useState< { lng:number, lat:number }[] >([]);
  const [userData, setUserData] = useState< User >(initialUserState);
  const [isSignedUp, setIsSignedUp] = useState< boolean >(false);
  const [hasSearch, setHasSearch] = useState< boolean >(false);

  useEffect(() => {
    setJams([]);
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <Topbar
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
                  setJams={setJams}
                  setHasSearch={setHasSearch}
                />
              )}
            />
            <Route path="/createjam" exact render={(props)=>(
              <CreateJam
              
              
              />)} />
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
                  isSignedUp={isSignedUp}
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
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={(props) => (
                <SignUp
                  {...props}
                  setUserData={setUserData}
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
                  setUserData={setUserData}
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
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
