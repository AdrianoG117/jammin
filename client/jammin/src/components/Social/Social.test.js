import {render, screen} from "@testing-library/react";
import Social from "./Social";


describe("Social component", ()=> {

   const scrollIntoView = window.HTMLElement.prototype.scrollIntoView = jest.fn()
  
  test("should match the snapshot", () => {
    const {container} = render(<Social
                  userData={{}}
                  setUserData={()=>{}}
                  isSignedUp={false}
                  setIsSignedUp={()=>{}}
                  jam={{}}
                  msg={{name:"", message: ""}}
                  setMsg={()=>{}}
                  initialState={{}}
                  scrollIntoView={scrollIntoView}
                   />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  test("Should render the chat box and post button if signed in", () => {
    render (<Social
                  userData={{}}
                  setUserData={()=>{}}
                  isSignedUp={true}
                  setIsSignedUp={()=>{}}
                  jam={{}}
                  msg={{name:"", message: ""}}
                  setMsg={()=>{}}
                  initialState={{}} 
                  scrollIntoView={scrollIntoView}
                  />);
    //title
    screen.getByPlaceholderText(/MESSAGE/);
    screen.getByRole("button", { name: "POST" });
  });

  test("Should message user to sign in if not signed in", () => {
    render (<Social
                  userData={{}}
                  setUserData={()=>{}}
                  isSignedUp={false}
                  setIsSignedUp={()=>{}}
                  jam={{}}
                  msg={{name:"", message: ""}}
                  setMsg={()=>{}}
                  initialState={{}} 
                  scrollIntoView={scrollIntoView}
                  />);
    //title
    screen.getByText(/Log in to use the chat !/);
  });

});