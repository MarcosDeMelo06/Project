// ./src/index.js
// importing the dependencies
const express = require('express');
const db = require('./queries');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();
// defining an array to work as the database (temporary solution)
const ads = [{
    title: 'Hello, world (again)!'
}];

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
    res.send(ads);
});

app.get('/lists', db.getLists);

app.get('/lists/:id', db.getListById);

app.post('/lists', db.createList);

app.put('/lists/:id', db.updateList);

//add new rote /lists/:id delete here
app.delete('/lists/:id', db.deleteList);

//adicionar nova rota /lists/:id/check put
app.put('/lists/:id', db.checkById);

// starting the server
app.listen(3000, () => {
    console.log('listening on port 3000');
});
