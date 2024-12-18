import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // Navigate hook

  // Handle the login logic
  const handleLogin = async (email, password) => {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Log the entire response data for comparison
      // console.log("Login response data:", data);

      if (response.ok) {
        // Save the token and role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Log the user role after storing it in localStorage
        // console.log("User role:", data.role);

        // Navigate to the homepage
        navigate("/");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Failed to connect to the backend");
    }
  };

  return (

    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm onLogin={handleLogin} error={error} />
        <button className="mt-4" onClick={() => navigate("/signup")}>
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
