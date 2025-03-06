import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Sending login request with:", { username, password });

      const res = await axios.post("http://localhost:4000/api/auth/login", {
        username,
        password,
      });

      console.log("Response received:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true); // Update authentication state
        navigate("/ingredients"); // Navigate after state update
      } else {
        setError("Invalid credentials. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password.");
    }
  };

  return (
    <div className='auth-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type='submit'>Login</button>
        {error && <p className='error'>{error}</p>}
      </form>
      <p>
        Don't have an account? <a href='/signup'>Sign up</a>
      </p>
    </div>
  );
};

export default Login;
