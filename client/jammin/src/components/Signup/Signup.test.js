import { render, screen } from "@testing-library/react";
import Signup from "./SignUp";
import userEvent from "@testing-library/user-event";
import apiService from "../../ApiService.js";

const mockProps = {
    firstname: "front test",
    lastname: "last test",
    email: "email test",
    password: "password test",
    pastEvents: [],
    comingEvents: [],
  };

describe("Signup component", ()=> {
  
  test("should match the snapshot", () => {
    const {container} = render(<Signup
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  
  test("Should render the headings", () => {
    render (<Signup
                  setUserData={()=>{}}
                  setIsSignedUp={()=>{}} />);
    //title
    screen.getByText(/Create your account/);
    screen.getByPlaceholderText(/First name/);
    screen.getByPlaceholderText(/Last name/);
    screen.getByPlaceholderText(/Email/);
    screen.getByPlaceholderText(/Password/);
    screen.getByRole("button", { name: "JOIN NOW" });
  });

//    submit function creates the object for the db
  test("Submit function creates object user when all fields filled in", async () => {
    
    const setUserData = jest.fn();
    const spy = jest.spyOn(apiService, "register");
    

    render (<Signup 
                  setUserData={setUserData}
                  setIsSignedUp={()=>{}}
     />);

    const firstNameInput = screen.getByPlaceholderText(/First name/);
    const lastNameInput = screen.getByPlaceholderText(/Last name/);
    const emailInput = screen.getByPlaceholderText(/Email/);
    const passwordInput = screen.getByPlaceholderText(/Password/);
    const submitBtn = screen.getByRole("button", { name: "JOIN NOW" });

        // console.log(submitBtn);

    userEvent.type(firstNameInput, "front test");
    userEvent.type(lastNameInput, "last test");
    userEvent.type(emailInput, "email test");
    userEvent.type(passwordInput, "password test");
    userEvent.click(submitBtn);

    expect(spy).toHaveBeenCalledWith(mockProps);

    });

});