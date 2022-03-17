const express = require('express');
const pino = require('express-pino-logger')();
const cors = require('cors');
var bodyParser = require("body-parser");
const createHttpError = require('http-errors')
const db = require("./models"); // models path depend on your structure
const validateRequest = require('./middleware/schemaValidator');

const {members, memberPaymentHistory} = db.models;
// const validateRequest = SchemaValidator(true);

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

app.get('/api/members/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const member = await db.models.members.findByPk(id);
    if(member)
      res.send(member);
    else
      res.status(404).send(`Member with id ${id} not found!`);

  } catch(err){
    res.status(500);
    next;
  }
})

app.get('/api/members', async (req, res, next) => {
  try {
    const members = await db.models.members.findAll();
    res.send(members);
  } catch(err){
    res.status(500);
    next;
  }
})


app.post('/api/members', validateRequest('members'), async (req, res, next) => {
  try{
    const { nic, name, address,  occupation, dob, doj , gender  } = req.body;
    const date_of_birth = dob;
    const date_of_join = doj;
    const sex = gender;
    const msg = await db.models.members.create( { nic, name, address, occupation, address, date_of_birth , date_of_join , sex  });
    res.status(201).send();
  } catch(err) {
    res.status(500);
    next;
  }
})

app.put('/api/members/:id', validateRequest('members'), async (req, res, next) => {
  try{
    const id = req.params.id;
    console.log(`ID -> ${id}`);
    const member = await db.models.members.findByPk(id);

    if(!member)
      res.status(404).send(`Member with id ${id} not found!`);

    const { nic, name, address, occupation, dob, doj , gender  } = req.body;
    const date_of_birth = dob;
    const date_of_join = doj;
    const sex = gender;
    const msg = await db.models.members.update( { nic, name, address, occupation, address, date_of_birth , date_of_join , sex  }, 
      {where: {id}});
    res.status(200).send();
  } catch(err) {
    res.status(500);
    next;
  }
})

app.delete('/api/members/:id',  async (req, res, next) => {
  try{
    const id = req.params.id;
    const member = await db.models.members.findByPk(id);
    if(!member)
      res.status(404).send(`Member with id ${id} not found!`);

    const msg = await db.models.members.destroy( {where: {id}});
    res.status(200).send();
  } catch(err) {
    res.status(500);
    next;
  }
})


app.get('/api/payments/members', async (req, res, next) => {
  try {
    members.hasMany(memberPaymentHistory, {foreignKey: 'id'})
    memberPaymentHistory.belongsTo(members, {foreignKey: 'member_id'})
    const memberPayments = await memberPaymentHistory.findAll({
      // where:{member_id:id}, 
      attributes: ['id', 
      'member_id', 
      'description', 
      'ammount', 
      'reciept_no', 
      'date_of_payment', 
      'remarks'],
      include: [{
        model: members,
        attributes: ['id', 
                    'name'],
        required: true,
       }] 

    });
    const response = memberPayments.map((elem) => {
      return (
        {
          id : elem.id,
          member_id: elem.member_id,
          description: elem.description,
          amount : elem.ammount,
          reciept_no : elem.reciept_no,
          date_of_payment: elem.date_of_payment,
          remarks: elem.remarks,
          name: elem.member.name,

        }
      )
    })
    res.send(response);
  } catch(err){
    res.status(500);
    next;
  }
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

var server = app.listen(port, () => console.log(`Listning to server on port ${port}`));
