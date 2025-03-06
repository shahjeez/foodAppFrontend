import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.scss";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:4000/api/auth/signup", {
        username,
        password,
      });

      navigate("/login"); // Redirect to login after signup
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className='auth-container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Sign Up</button>
        {error && <p className='error'>{error}</p>}
      </form>
      <p>
        Already have an account? <a href='/login'>Login</a>
      </p>
    </div>
  );
};

export default Signup;
