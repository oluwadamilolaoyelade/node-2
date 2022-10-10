const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../config/config.js');
const queries = require('../queries/student_query');

const fetchStudents = async (req, res) => {
    try {
        const students = await db.any(query.getAllstudents)
        return res.status(200).json({
            status: 'Success',
            message: 'Students returned',
            data: students
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const registerStudent = async (req, res) => {
    let { name, address, dob, email, school_id, password } = req.body;
    try {
        const existingEmail = await db.any(queries.findByEmail, [email]);
        if (!existingEmail) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Email already exists'
            })
        }
        password = bcrypt.hashSync(password, 10);
        const student = await db.any(queries.registerStudent, [name, address, dob, email, school_id, password])
        delete student[0].password
        return res.status(200).json({
            status: 'Success',
            message: 'Student Added',
            data: student
        })
    } catch (err) {
        console.log(err)
        return err
    }
}

const updateStudent = async (req, res) => {
    let { id } = req.params;
    let { name, address, dob, email, school_id } = req.body;
    try {
        await db.none(query.updateStudent(name, address, dob, email, school_id, id))
        return res.status(200).json({
            status: 'Success',
            message: 'Student Updated',
        })
    } catch (err) {
        if (err) {
            console.log(err)
            return err;
        }
    }
}

const deleteStudent = async (req, res) => {
    let { id } = req.params;
    try {
        await db.none(query.deleteStudent(id))
        return res.status(200).json({
            status: 'Success',
            message: 'Student Removed',
        })
    } catch (err) {
        console.log(err)
        return err;
    }
}

const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        const existingEmail = await db.any(queries.findByEmail, [email]);
        const student = await db.any(queries.getStudentByEmail, [email]);
        if (!existingEmail) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No user with email'
            })
        }
        console.log('Student', student.password)
        const passwordMatch = bcrypt.compareSync(password, student[0].password);
        if (!passwordMatch) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Incorrect password'
            })
        }
        const sessionToken = jwt.sign(
            {
                student_id: student.id,
                email: student.email,
                name: student.name,
            },
            process.env.JWT_SECRET_KEY
        );
        delete student[0].password
        return res.status(200).json({
            status: 'Success',
            message: 'Logged In Successfully',
            data: {
                student,
                token: sessionToken
            }
        })
    } catch (err) {
        console.log(err)
        return err;
    }

}

module.exports = {
    fetchStudents,
    registerStudent,
    updateStudent,
    deleteStudent,
    login
}