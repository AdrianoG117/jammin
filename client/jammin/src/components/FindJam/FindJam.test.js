import {render, screen} from "@testing-library/react";
import FindJam from "./FindJam";

describe("FindJam component", ()=> {
  
    test("should match the snapshot", () => {
      const {container} = render(<FindJam
                    jams={[]} 
                    setJams={()=>{}} 
                    searchVal={""} 
                    setSearchVal={()=>{}} 
                    center={{lat:"", lng:""}} 
                    setCenter={()=>{}} 
                    markers={[]} 
                    setMarkers={()=>{}} 
                    hasSearch={false} 
                    setHasSearch={()=>{}} 
                    isSignedUp={false}
                    />);
      expect(container.firstChild).toMatchSnapshot();
    });
    
    test("Should render search and search button", () => {
      render (<FindJam
                    jams={[]} 
                    setJams={()=>{}} 
                    searchVal={""} 
                    setSearchVal={()=>{}} 
                    center={{lat:"", lng:""}} 
                    setCenter={()=>{}} 
                    markers={[]} 
                    setMarkers={()=>{}} 
                    hasSearch={false} 
                    setHasSearch={()=>{}} 
                    isSignedUp={false} 
                    />);
      //title
      screen.getByPlaceholderText(/Enter your city/);
      screen.getByRole("button", { name: "Search" });
    });

    test("If there are events in your location, display the events and map", () => {

    })

    test("If there are no events in your location, display text and Create a Jam button", () => {

    })

    test("If city is searched display the city in the placeholder", () => {

    })
  
  });