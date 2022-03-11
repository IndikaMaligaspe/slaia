const express = require('express');
const pino = require('express-pino-logger')();
const cors = require('cors');
var bodyParser = require("body-parser");
const createHttpError = require('http-errors')
const db = require("./models"); // models path depend on your structure
const SchemaValidator = require('./middleware/schemaValidator');

const validateRequest = SchemaValidator(true);

const app = express();
app.use(cors());
app.use(bodyParser.json());


// const salai = db.slaia;


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
app.post('/api/members', validateRequest, async (req, res, next) => {
  try{
    const { nic, name, address1, address2,city, occupation, dob, doj , gender  } = req.body;
    const address = address1.concat(',', address2, ',', city);
    const date_of_birth = dob;
    const date_of_join = doj;
    const sex = gender;
    const msg = await db.models.members.create( { nic, name, address, occupation, address, date_of_birth , date_of_join , sex  });
    res.status(201);
  } catch(err) {
    res.status(500);
    next;
  }
  // res.send(req.body);
})

//* Catch HTTP 404 
app.use((req, res, next) => {
  next(createHttpError(404));
})

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
      error: {
          status: err.status || 500,
          message: err.message
      }
  })
})

var server = app.listen(port, () => console.log('Listning to server on port ${port}'));
