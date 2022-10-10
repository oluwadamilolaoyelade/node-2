const { Joi } = require('express-validation');

module.exports = {
    vSignUpStudents: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().min().required(),
            dob: Joi.string(),
            address: Joi.string(),
            student_id: Joi.number()
        })
    },
    vLogin: {
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().min().required()
        })
    }
}