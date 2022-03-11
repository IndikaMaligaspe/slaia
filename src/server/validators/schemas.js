const Joi = require('joi');
const memberSchema = Joi.object().keys({
    nic: Joi.string().required().length(9),
    name: Joi.string().required(),
    address1: Joi.string().required(),
    address2: Joi.any(),
    city: Joi.string(),
    occupation:Joi.string().required(),
    dob: Joi.date().required(),
    doj:Joi.date().required(),
    gender: Joi.string().valid('M',"F").required()
});

module.exports = {
    '/api/members':memberSchema
}