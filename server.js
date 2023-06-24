require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors()); // Enable CORS for all routes

app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Database connection and error handling
// const sequelize = db.sequelize;
// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log('Table structure has been altered successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to alter table structure:', err);
//     process.exit(1); // Terminate the application in case of a database alteration error
//   });

// Load routes
const tutorialRoutes = require('./routes/turorial.routes');
tutorialRoutes(app); // Call the exported function and pass the app object

// Define a default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the tutorials application.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
