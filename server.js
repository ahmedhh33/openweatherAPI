// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// GET route
app.get('/all', (req, res) => {
  res.send(projectData);
});

// POST route
app.post('/add', (req, res) => {
  const { temperature, date, userResponse } = req.body;
  projectData['temperature'] = temperature;
  projectData['date'] = date;
  projectData['userResponse'] = userResponse;
  res.send(projectData); // Or send a success message or status
});

