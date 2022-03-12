const Joi = require('joi');
const memberSchema = Joi.object().keys({
    id: Joi.any(),
    nic: Joi.string().required().length(9),
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string(),
    occupation:Joi.string().required(),
    dob: Joi.date().required(),
    doj:Joi.date().required(),
    gender: Joi.string().valid('M',"F").required()
});

module.exports = {
    'members':memberSchema
}