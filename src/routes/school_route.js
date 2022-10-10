const express = require('express');
const router = express.Router();
const school = require('../controllers/school.js')

router.get('/schools', school.fetchSchools);
router.post('/schools', school.postSchool);
router.patch('/schools/:id', school.updateSchool);
router.delete('/schools/:id', school.deleteSchool);

module.exports = router;