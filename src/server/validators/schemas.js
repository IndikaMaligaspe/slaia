const Joi = require('joi');
const memberSchema = Joi.object().keys({
    id: Joi.any(),
    nic: Joi.string().required().length(9),
    name: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string(),
    occupation:Joi.any(),
    dob: Joi.date().required(),
    doj:Joi.date().required(),
    gender: Joi.string().valid('M',"F").required()
});

const memberPaymentSchema = Joi.object().keys({
    id: Joi.any(),
    name: Joi.any(),
    member_id: Joi.string().required(),
    description: Joi.string().required(),
    ammount:Joi.number().required(),
    reciept_no: Joi.string().required(),
    date_of_payment:Joi.date().required(),
    remarks: Joi.any()
});


module.exports = {
    'members':memberSchema,
    'memberPayments':memberPaymentSchema
}