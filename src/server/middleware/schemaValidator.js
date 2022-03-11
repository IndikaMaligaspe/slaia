const Joi = require('joi');
const Schema = require('../validators/schemas');
const _  = require('lodash');
const createHttpError = require('http-errors')

module.exports = () => {
    // useJoiError determines if we should respond with the base Joi error
    // boolean: defaults to false
    
    const _supportedMethods = ['post', 'put'];
    
    // Joi validation options

    return async function (req, res, next) {
        const route = req.route.path;
        const method = req.method.toLowerCase();
        if (_.includes(_supportedMethods, method)) {
            console.log(1)
            // get schema from current route
            const _schema = _.get(Schema, route);

            if(_schema) {
                console.log(2)
                // Validate req.body using the schema validation options
                try{
                    const validated  = await _schema.validateAsync(req.body)
                    req.body = validated
                    next()   
                } catch (err) {
                    if (err.isJoi){
                        console.log(3)
                        return next(createHttpError(422, {message:err.message}))
                    }
                    next(createHttpError(500))
                }
                
            }
        }
    }
}