import { render, screen } from '@testing-library/react';
import CreateJam from './CreateJam';
import apiService from '../../ApiService';
import { userEvent } from '@testing-library/user-event';


jest.mock(apiService, () => ( {
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
}


test.only('CreateJam component', async ()=> {
  const setState = jest.fn();
  const storage = {setItem: jest.fn()}
  const submitInfo = {title: "Rainy day"}

  render(<CreateJam
    setState = {setState}
    storage = {storage}
  />);
  const titleInput = screen.getByPlaceHolderText(/TITLE/);
  const dateInput = screen.getByPlaceHolderText(/DATE/);
  const descriptionInput = screen.getByPlaceHolderText(/DESCRIPTION OF YOUR JAM/);
  const cityInput = screen.getByPlaceHolderText(/YOUR CITY/);
  const locationInput = screen.getByPlaceHolderText(/JAM LOCATION/);

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
})
