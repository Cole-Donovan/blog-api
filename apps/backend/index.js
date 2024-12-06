require('dotenv').config(); // Load environment variables
const app = require('./src/app'); // Import the main app configuration

const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
