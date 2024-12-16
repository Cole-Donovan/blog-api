import React, { useState, useEffect } from "react";

function ThemeSwitcher() {
  const [theme, setTheme] = useState(""); // Default theme

  // Apply theme on initial render based on localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme"); // Get the saved theme
    if (savedTheme) {
      setTheme(savedTheme); // Set the theme if it exists
      document.documentElement.setAttribute("data-theme", savedTheme); // Apply the theme immediately on page load
    } else {
      document.documentElement.setAttribute("data-theme", theme); // Apply default theme if no saved theme
    }
  }, []); // Run once on initial render

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Apply the theme to the root element
    localStorage.setItem("theme", newTheme); // Save the theme in localStorage
  };

  return (
    <div className="px-4 py-4 rounded-lg flex justify-center items-center">
      <div className="grid grid-cols-4 bg-white border border-theme-900 rounded-sm">
        {["light", "dark", "red", "orange", "yellow", "green", "blue", "violet"].map((themeOption) => (
          <button
            key={themeOption}
            onClick={() => changeTheme(themeOption)}
            className={`block w-12 h-12
              bg-${themeOption}
              ${theme === themeOption ? "scale-110 border border-theme-900 rounded-sm" : "hover:rounded-sm hover:scale-110 hover:border hover:border-theme-900"}
              transition-transform duration-300`}
          />
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
