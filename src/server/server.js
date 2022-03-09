const express = require('express');
const pino = require('express-pino-logger')();
const cors = require('cors');
var bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

const users = [
    {"id":0,"date":"16 Mar, 2021","name":"Elvis Presley","shipTo":"Tupelo, MS","paymentMethod":"Annual fees","amount":"2000"},
    {"id":1,"date":"16 Mar, 2021","name":"Elvis Presley","shipTo":"Tupelo, MS","paymentMethod":"Annual fees","amount":"2000"},
    {"id":2,"date":"16 Mar, 2021","name":"Elvis Presley","shipTo":"Tupelo, MS","paymentMethod":"Annual fees","amount":"2000"},
    {"id":3,"date":"16 Mar, 2021","name":"Elvis Presley","shipTo":"Tupelo, MS","paymentMethod":"Annual fees","amount":"2000"},
    {"id":4,"date":"16 Mar, 2021","name":"Elvis Presley","shipTo":"Tupelo, MS","paymentMethod":"Annual fees","amount":"2000"},
  ];

  
app.get('/api/recent_transactions', (req, res) => {
    res.send(JSON.stringify(users));
})

app.get('/api/members', (req, res) => {
  res.send(JSON.stringify(users));
})
app.post('/api/members', (req, res) => {
  console.log(req.body);
  res.send(req.body);
})
var server = app.listen(port, () => console.log('Listning to server on port ${port}'));
