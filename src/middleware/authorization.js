const db = require('../config/config')
const jwt = require('jsonwebtoken')
const queries = require('../queries/school_query')


module.exports = {
    school: async(req, res, next) => {
        try {

            if (!req.headers.authorization) {
                next(res.status(401).json({
                    message:'no authentication provided',
                    status: 'unathorized'
                }))

            }else{
                const token = req.headers.authorization.split(' ')[1]
                jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

                    if (err) {
                        next(res.status(401).json({
                            message:'unable to verify token',
                            status: 'unathorized'
                        }))
                    } else {
                        req.school = decoded
                        db.one(queries.findSchoolByEmail, [decoded.email]).then((school) => {

                            if (!school) {
                                next(res.status(404).json({
                                    message:'ivalid token, school does not exists',
                                    status: 'not found'
                                }))
                            } else {
                                next()
                            }
                        })
                    }
                })
            }

        } catch (error) {
            next(error)
        }
    }
}