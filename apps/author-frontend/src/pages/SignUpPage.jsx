import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state
  const navigate = useNavigate(); // Navigate hook

  const handleSignUp = async (name, email, password) => {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Include name in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login page after 2 seconds
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Failed to connect to the backend");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <SignUpForm onSignUp={handleSignUp} error={error} success={success} />
        <button
          className="mt-4"
          onClick={() => navigate("/login")}
        >
          Login Instead
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
