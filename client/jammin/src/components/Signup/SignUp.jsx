import React, { useState } from "react";
import apiService from "../../ApiService.js";
import "./signup.css";
import { useHistory } from "react-router-dom";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  pastEvents: [],
  comingEvents: [],
};

function SignUp({ setUserData, setIsSignedUp }) {
  const [state, setState] = useState(initialState);

  const history = useHistory();

  // adds name property based on it's relevant property/key name, then adds the corresponding value
  function handleChange(e) {
    const { name, value } = e.target;
    setState((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // on submit adds the inital state object to the db
  async function handleSubmit(e) {
    e.preventDefault();
    const user = await apiService.register(state);
    console.log("USER: ", user);
    setUserData(user);
    setIsSignedUp(true);
    setState(initialState);
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
