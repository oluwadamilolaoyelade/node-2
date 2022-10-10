const express = require('express');
const schoolRouter = require('./src/routes/school_route');
const studentRouter = require('./src/routes/student_route')
const dotenv = require('dotenv');
const port = process.env.PORT;

dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(schoolRouter);
app.use(studentRouter);

app.listen(port, () => {
    console.log(`Application running on  port ${port}`);
})