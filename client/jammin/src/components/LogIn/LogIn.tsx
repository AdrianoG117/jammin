import React, { useState, SetStateAction } from "react";
import apiService from "../../apiService/ApiService";
import "./login.css";
import { useHistory } from "react-router-dom";
import { User } from "../../apiService/APIResponseTypes";

interface IProps {
  setUserData: React.Dispatch<SetStateAction< User >>; 
  setIsSignedUp: React.Dispatch<SetStateAction< boolean >>;
}

interface InitialState  {
  email: string,
  password: string,
};

const initialState = {
  email: "",
  password: "",
};

const LogIn:React.FunctionComponent<IProps> = ({ setUserData, setIsSignedUp }:IProps) => {
  const [state, setState] = useState<InitialState>(initialState);

  const history = useHistory();

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => { //is this event correct?
    const { name, value } = event.currentTarget;
    setState((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = apiService.login(state)
    .then((user) => {
      if (user) setUserData(user); setIsSignedUp(true); setState(initialState); history.push('/dashboard');
    }).finally(()=>[0]);
    
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(event) => handleSubmit(event)}>
        <input
          required
          id="mail"
          type="text"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          required
          id="pwd"
          type="password"
          placeholder="Password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
        <button className="input-btn">LOG IN</button>
      </form>
    </div>
  );
}

export default LogIn;
