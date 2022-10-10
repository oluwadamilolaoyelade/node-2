const db = require('../config/config.js')
const query = require('../queries/school_query')

const fetchSchools = async (req, res) => {
    try {
        const schools = await db.any(query.getAllSchools)
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
const postSchool = async (req, res) => {
    const { name, address, year_established, email } = req.body;
    try {
        await db.none(query.postNewSchool(name, address, year_established, email))
        return res.status(200).json({
            status: 'Success',
            message: 'School Added',
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const updateSchool = async (req, res) => {
    const { id } = req.params;
    const { name, address, year_established, email } = req.body;
    try {
        await db.none(query.updateSchool(name, address, year_established, email, id))
        return res.status(200).json({
            status: 'Success',
            message: 'School Updated',
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const deleteSchool = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        db.none(query.deleteSchool(id));
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
    postSchool,
    updateSchool,
    deleteSchool
}