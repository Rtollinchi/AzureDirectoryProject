import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import glgLogo from '../assets/glg-logo.png'; // Adjust the path based on where you saved the logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear previous messages
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      if (response.data && response.data.token) {
        // Check if the response includes a token
        setMessage(response.data.message);
        navigate("/users"); // Navigate to the UserList page
      } else {
        setMessage("Authentication failed, no token received.");
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Login failed: Network error");
      }
    }
  };

  return (
    <div className="login-form">
      <img src={glgLogo} alt="GLG Logo" className="login-logo" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
