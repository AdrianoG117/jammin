import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./home.css";

function Home({setJams,setHasSearch }) {
  
  const history = useHistory();

  useEffect(() => {
      setJams([]);
      setHasSearch(false);
    
  }, []);

  return (
    <div className="main">
      <div className="slogan">
        <h1>JAMMIN'</h1>
        <h2>Music is meant to be shared.</h2>
      </div>
      <div className="btn-container">
        
          <button className="home-btn" onClick={()=> history.push("/createjam")}>CREATE YOUR JAM</button>
       
          <button className="home-btn" onClick={()=> history.push("/findjam")}>FIND A JAM</button>
        
      </div>
    </div>
  );
}

export default Home;
