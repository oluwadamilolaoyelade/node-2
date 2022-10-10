const queries = {
    registerStudent: `
            INSERT INTO students (name, address, dob, email, school_id, password)
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *;
    `,
    updateStudent: `
        UPDATE students
        SET name = $1, address = $2, dob = $3,
        WHERE id = $4
    `,
    getStudents: `
                SELECT * FROM students
                RETURNING *;
    `,
    getOneStudent: `SELECT * FROM students WHERE id = $1`,
    getStudentByEmail: `SELECT * FROM students WHERE email = $1`,
    deleteStudent: `DELETE FROM students WHERE id = $1`,
    findByEmail: `SELECT email FROM students WHERE email = $1;`

}

module.exports = queries;

// module.exports = {
//     getAllstudents: `
//         SELECT * 
//         FROM 
//             students;
//     `,
//     postStudent: (name, address, dob, email, school_id, password) => {
//         return `
//                 INSERT INTO 
//                 students (name, address, dob, email, school_id, password)
//                     VALUES
//                     ('${name}', '${address}', '${dob}', '${email}', '${school_id}', '${password}');
//         `
//     },
//     findByEmail: (email) => {
//         return `
//             SELECT email FROM students WHERE email = ${email};
//         `
//     },
//     updateStudent: (name, address, dob, email, school_id, id) => {
//         let updateValues = [];
//         if (name) updateValues.push(`name = '${name}'`);
//         if (address) updateValues.push(`address = '${address}'`);
//         if (dob) updateValues.push(`dob = '${dob}'`);
//         if (email) updateValues.push(`email = '${email}'`);
//         if (school_id) updateValues.push(`school_id = '${school_id}'`);

//         if (!updateValues.length) return;

//         return `
//                 UPDATE students
//                 SET ${updateValues.join(', ')}
//                 WHERE id = ${id};
//         `
//     },
//     deleteStudent: (id) => {
//         return `
//             DELETE FROM
//                 students
//             WHERE id = ${id};
//         `
//     }
// }