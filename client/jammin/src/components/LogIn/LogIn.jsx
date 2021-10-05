import React, { useState } from 'react';
import apiService from '../../ApiService';
import './login.css';
import { useHistory } from 'react-router-dom';

const initialState = {
  email: '',
  password: '',
};

function LogIn({ setUserData, setIsSignedUp }) {
  const [state, setState] = useState(initialState);

  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    setState((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await apiService.login(state);
    setUserData(user);
    setIsSignedUp(true);
    setState(initialState);
    history.push('/dashboard');
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
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
