import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),  // Include name in the request body
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
    <div>
      <SignUpForm onSignUp={handleSignUp} error={error} success={success} />
      <button onClick={() => navigate("/login")}>
        Login Instead
      </button>
    </div>
  );
};

export default SignUpPage;