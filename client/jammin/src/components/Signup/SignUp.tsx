import React, { useState, SetStateAction } from "react";
import apiService from "../../apiService/ApiService";
import "./signup.css";
import { useHistory } from "react-router-dom";
import { User } from "../../apiService/APIResponseTypes";

interface IProps {
  setUserData: React.Dispatch<SetStateAction< User >>; 
  setIsSignedUp: React.Dispatch<SetStateAction< boolean >>;
  state: User;
  setState: React.Dispatch<SetStateAction< User >>
}


const initialState:User = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  pastEvents: [],
  comingEvents: [],
};

const SignUp:React.FunctionComponent<IProps> = ({ setUserData, setIsSignedUp }:IProps) => {
  const [state, setState] = useState(initialState);

  const history = useHistory();

  // adds name property based on it's relevant property/key name, then adds the corresponding value
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setState((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // on submit adds the inital state object to the db
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = apiService.register(state)
    .then((user) => { 
      if (user) setUserData(user); setIsSignedUp(true);setState(initialState);})
    .finally(() => [0])
    history.push("/dashboard");
  }

  return (
    <div className="signup-container">
      <h1>Create your account</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          required
          id="firstname"
          type="text"
          placeholder="First name"
          name="firstname"
          value={state.firstname}
          onChange={handleChange}
        />
        <input
          required
          id="lastname"
          type="text"
          placeholder="Last name"
          name="lastname"
          value={state.lastname}
          onChange={handleChange}
        />
        <input
          required
          id="email"
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          required
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button type="submit" className="signup-btn">JOIN NOW</button>
      </form>
    </div>
  );
}

export default SignUp;
