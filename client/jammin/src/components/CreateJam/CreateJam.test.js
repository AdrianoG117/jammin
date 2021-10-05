import { render, screen } from "@testing-library/react";
import CreateJam from "./CreateJam";
<<<<<<< HEAD
// import apiService from "../../ApiService";
// import userEvent from "@testing-library/user-event";
const {default: userEvent} = require("@testing-library/user-event");
=======
import apiService from "../../apiService/ApiService";
import { userEvent } from "@testing-library/user-event";
>>>>>>> c3518d968a587c88bf7684aac1be1462dfe7af42

jest.mock("../../ApiService", () => ( {
  postEvent: () => ( {
    title: "Rainy day",
    date: "2021-10-22T13:06",
    description: "fhfhhhfhj",
    city: "Barcelona, Spain",
    location: "Barcelona, Spain",
  })
}));

const setStateObj = {
  title: "",
  date: "",
  description: "",
  city: "",
  location: "",
};


test("CreateJam component", async ()=> {
  const setState = jest.fn();
  const storage = {setItem: jest.fn()};
  const submitInfo = {title: "Rainy day"};

  render(<CreateJam
    setState = {setState}
    storage = {storage}
  />);
  const titleInput = screen.getByPlaceholderText(/TITLE/);
  const dateInput = screen.getByPlaceholderText(/DATE/);
  const descriptionInput = screen.getByPlaceholderText(/DESCRIPTION OF YOUR JAM/);
  const cityInput = screen.getByPlaceholderText(/YOUR CITY/);
  const locationInput = screen.getByPlaceholderText(/JAM LOCATION/);

  const submitButton = screen.getByRole("button", {name: /CREATE MY EVENT/});

  userEvent.type(titleInput, "Rainy day");
  userEvent.type(dateInput, "2021-10-22T13:06");
  userEvent.type(descriptionInput, "fhfhhhfhj");
  userEvent.type(cityInput, "Barcelona, Spain");
  userEvent.type(locationInput, "Barcelona, Spain");


  await userEvent.click(submitButton);

  expect(storage.setItem).toHaveBeenCalledWith("title", submitInfo.title);
  expect(setState).toHaveBeenCalledWith(setStateObj.title);
  expect(storage.setItem).toHaveBeenCalledWith("date", submitInfo.date);
  expect(setState).toHaveBeenCalledWith(setStateObj.date);
  expect(storage.setItem).toHaveBeenCalledWith("description", submitInfo.description);
  expect(setState).toHaveBeenCalledWith(setStateObj.description);
  expect(storage.setItem).toHaveBeenCalledWith("city", submitInfo.city);
  expect(setState).toHaveBeenCalledWith(setStateObj.city);
  expect(storage.setItem).toHaveBeenCalledWith("location", submitInfo.location);
  expect(setState).toHaveBeenCalledWith(setStateObj.location);
});
