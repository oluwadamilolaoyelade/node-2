const queries = {
    registerStudent: `
            INSERT INTO students (name, address, dob, email, school_id, password)
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *;
    `,
    updateStudent: `
        UPDATE students
        SET name = $1, address = $2, dob = $3
        WHERE id = $4 RETURNING *
    `,
    getStudents: `SELECT * FROM students;`,
    getOneStudent: `SELECT * FROM students WHERE id = $1`,
    getStudentByEmail: `SELECT * FROM students WHERE email = $1`,
    deleteStudent: `DELETE FROM students WHERE id = $1`,
    findByEmail: `SELECT email FROM students WHERE email = $1;`

}

module.exports = queries;