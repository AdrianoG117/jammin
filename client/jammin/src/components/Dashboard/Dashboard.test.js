import {render, screen} from "@testing-library/react";
import Dashboard from "./Dashboard";


const mockProps = {
  userData:{
    comingEvents: [
      {
      city: "Miami, FL, USA",
      cityCords: {lat: 25.7616798, lng: -80.1917902},
      comingEvent: true,
      date: "2021-10-22T09:10",
      description: "Poop",
      host: "",
      languages: "English",
      locCords: {lat: 25.7616798, lng: -80.1917902},
      location: "Miami, FL, USA",
      messages: [],
      numOfParticipants: 1,
      pastEvent: false,
      title: "Test1",
      __v: 0,
      _id: "615aa8eb25df7e7d9ed72fbc",
    }, {
      city: "Miami, FL, USA",
      cityCords: {lat: 25.7616798, lng: -80.1917902},
      comingEvent: true,
      date: "2021-10-22T09:10",
      description: "Poop",
      host: "",
      languages: "English",
      locCords: {lat: 25.7616798, lng: -80.1917902},
      location: "Miami, FL, USA",
      messages: [],
      numOfParticipants: 1,
      pastEvent: false,
      title: "Test1",
      __v: 0,
      _id: "615aa8eb25df7e7d9ed72fbd",
    }
  ],
    email: "a@gmail.com",
    firstname: "ad",
    lastname: "ad",
    password: "1234",
  }
};

const emptyUser = {
  userData : {
    firstname: "ad",
    comingEvents: [],
  }
};

describe("Dashboard component", ()=> {
  
  test("should match the snapshot with array", () => {
    const {container} = render(<Dashboard
                  userData={mockProps.userData}
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  
});

  
  describe("prop value rendering", () => {
    beforeEach(() => {
      render (<Dashboard
                  userData={emptyUser.userData}
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    });
      
    test("should display correct values when arr empty", () => {
      if(emptyUser.userData.comingEvents.length < 1){
        //title
        screen.getByText(`Hi ${emptyUser.userData.firstname}`);
        screen.getByText("You have no jams added yet, go to the Find Jam section to find events around you");
      }
     });  

  });

