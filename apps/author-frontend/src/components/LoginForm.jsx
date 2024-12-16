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
    <div className="shadow-lg rounded-lg p-8 bg-theme-900">
      <h2 className="text-center mb-8">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-md text-center mt-2">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="justify-center mt-6 bg-theme-700 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-600 focus:outline-none transition"
          >
            <span className="text-base">Login</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
