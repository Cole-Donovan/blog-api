import React, { useState } from "react";

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the onLogin prop with email and password
    onLogin(email, password);
  };

  return (
    <div>
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
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
