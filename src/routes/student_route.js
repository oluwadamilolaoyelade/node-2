const express = require('express');
const router = express.Router();
const student = require('../controllers/student.js');
const authorize = require('../middleware/authorization')

// const { validate } = require("express-validation");
// const { vSignUpStudents } = require('../validations/student_validation');

router.get('/students', student.fetchStudents);
router.get('/students/:id', student.getOneStudent);
router.post('/students', authorize.school, student.registerStudent);
router.post('/students/login', student.login);
router.patch('/students/:id', student.updateStudent);
router.delete('/students/:id', student.deleteStudent);

module.exports = router;