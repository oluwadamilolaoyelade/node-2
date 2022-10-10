const db = require('../config/config.js')
const queries = require('../queries/school_query')

const fetchSchools = async (req, res) => {
    try {
        const schools = await db.any(queries.getSchools)
        return res.status(200).json({
            status: 'Success',
            message: 'Schools returned',
            data: schools
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const getSingleSchool = async (req, res) => {
    let { id } = req.params;
    try {
        const school = await db.any(queries.getOneSchool, [id])
        return res.status(200).json({
            status: 'Success',
            message: 'School Retrieved',
            data: school
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const registerSchool = async (req, res) => {
    let { name, address, year_established, email } = req.body;
    try {
        const existingName = await db.any(queries.getSchoolByName, [name]);
        console.log(existingName)
        if (existingName.length > 0) {
            return res.status(400).json({
                status: 'Failed',
                message: 'School already exists',
            })
        }
        const school = await db.any(queries.registerSchool, [name, address, year_established, email])
        return res.status(200).json({
            status: 'Success',
            message: 'School Added',
            data: school
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const updateSchool = async (req, res) => {
    let { id } = req.params;
    let { name, address } = req.body;
    try {
        const school = await db.any(queries.updateSchool, [name, address, id])
        return res.status(200).json({
            status: 'Success',
            message: 'School Updated',
            data: school
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const deleteSchool = async (req, res) => {
    let { id } = req.params;
    try {
        db.none(queries.deleteSchool, [id]);
        return res.status(200).json({
            status: 'Success',
            message: 'School Removed',
        })

    } catch (err) {
        console.log(err)
        return err
    }
}

module.exports = {
    fetchSchools,
    registerSchool,
    updateSchool,
    deleteSchool,
    getSingleSchool
}