import { useState } from "react";

const SignUpForm = ({ onSignUp, error, success }) => {
  const [name, setName] = useState(""); // Add state for name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(name, email, password); // Pass name along with email and password
  };

  return (
    <div className="shadow-lg rounded-lg p-8 bg-theme-900">
      <h2 className="text-center mb-8">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500 text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-center">
            {success}
          </p>
        )}
        <div>
          <label htmlFor="name" className="block mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-theme-700"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-theme-700"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-theme-700"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="justify-center mt-6 bg-theme-700 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-600 focus:outline-none transition"
          >
            <span className="text-base">Sign Up</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
