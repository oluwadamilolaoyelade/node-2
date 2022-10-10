const queries = {
    registerSchool: `
            INSERT INTO school (name, address, year_established, email)
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
    `,
    updateSchool: `
        UPDATE school
        SET name = $1, address = $2
        WHERE id = $3 RETURNING *
    `,
    getSchools: `SELECT * FROM school;`,
    getOneSchool: `SELECT * FROM school WHERE id = $1`,
    deleteSchool: `DELETE FROM school WHERE id = $1`,
    getSchoolByName: `SELECT * FROM school WHERE name = $1`
}

module.exports = queries;


// module.exports = {
//     getAllSchools: `
//         SELECT * 
//         FROM 
//             school;
//     `,
//     postNewSchool: (name, address, year_established, email) => {
//         return `
//                 INSERT INTO 
//                 school (name, address, year_established, email)
//                     VALUES
//                     ('${name}', '${address}', '${year_established}', '${email}');
//         `
//     },
//     updateSchool: (name, address, year_established, email, id) => {
//         let updateValues = [];
//         if (name) updateValues.push(`name = '${name}'`);
//         if (address) updateValues.push(`address = '${address}'`);
//         if (year_established) updateValues.push(`year_established = '${year_established}'`);
//         if (email) updateValues.push(`email = '${email}'`);

//         if (!updateValues.length) return;

//         return `
//             UPDATE school
//             SET ${updateValues.join(', ')}
//             WHERE id = ${id};
//         `
//     },
//     deleteSchool: (id) => {
//         return `
//             DELETE FROM
//                 school
//             WHERE id = ${id};
//         `
//     }
// }