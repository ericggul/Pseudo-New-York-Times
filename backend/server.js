

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');

//Moongoose Connection
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('conencted to databse'));


const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

var date = new Date();
var year = date.getFullYear()-1;
var month = date.getMonth()+1;

const requestEndpoint = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=nt2Q0qTwiNn6wtgNPMlergh0X2fzlre0`;

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get('/getData', cors(corsOptions), async (req, res) => {
    const fetchOptions = {
        method: 'GET'
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});