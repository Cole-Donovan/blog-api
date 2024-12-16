import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true; // If no token, it's considered expired

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Get current time in seconds

    // Check if the token's expiration time has passed
    return decodedToken.exp < currentTime;
  } catch (error) {
    // If token is invalid or decoding fails, assume it is expired
    console.error("Error decoding token", error);
    return true;
  }
};
