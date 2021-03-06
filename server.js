// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(process.env.PORT || 3000, listening);

// Callback Function
function listening(){
    console.log(`Server is running on port: ${port}`);
};

//GET Route
app.get('/weather', (req, res) => res.send(projectData));

//POST Route
app.post('/weatherData', (req, res) => {
    
    projectData = {
        temprature : req.body.temp,
        date : req.body.date,
        feelings : req.body.feelings
    };

    // Checking stuff
    console.log(`This is content : ${projectData}`)
    console.log('This is project data :- ');
    console.table(projectData);
    //-------------

    res.send(projectData);
});