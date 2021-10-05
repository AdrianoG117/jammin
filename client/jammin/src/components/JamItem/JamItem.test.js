import {render, screen} from "@testing-library/react";
import JamItem from "./JamItem";
import moment from "moment";

const mockProps = {
  jam: {
    city: "Miami, FL, USA",
    cityCords: {lat: 25.7616798, lng: -80.1917902},
    comingEvent: true,
    date: "2021-10-02T17:12",
    description: "Poop",
    host: "",
    languages: "English",
    locCords: {lat: 25.7616798, lng: -80.1917902},
    location: "Miami, FL, USA",
    messages: [],
    numOfParticipants: 1,
    pastEvent: false,
    title: "Test1",
  },
  setHighEvent: ()=>{},
  
};

describe("JamItem component", () => {
  test("should match the snapshot", () => {
    const {container} = render(<JamItem
      jam={mockProps.jam}
      setHighEvent={mockProps.setHighEvent}
      ></JamItem>);
      expect(container.firstChild).toMatchSnapshot();
  });
  });
  
  describe("prop value rendering", () => {
    beforeEach(() => {
      render(<JamItem
            jam={mockProps.jam}
            setHighEvent={mockProps.setHighEvent}
            ></JamItem>);
});
     test("rendered title should match jam prop", () => {
      screen.getByText(`${mockProps.jam.title}`);
     });
     test("rendered location should match jam prop", () => {
      screen.getByText(`${mockProps.jam.location}`);
     });
     test("rendered date should match jam prop", () => {
      screen.getByText(`${moment(mockProps.jam.date).format("MMM Do, h:mm a")}`);
     });    
  });
