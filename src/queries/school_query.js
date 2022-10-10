module.exports = {
    getAllSchools: `
        SELECT * 
        FROM 
            school;
    `,
    postNewSchool: (name, address, year_established, email) => {
        return `
                INSERT INTO 
                school (name, address, year_established, email)
                    VALUES
                    ('${name}', '${address}', '${year_established}', '${email}');
        `
    },
    updateSchool: (name, address, year_established, email, id) => {
        let updateValues = [];
        if (name) updateValues.push(`name = '${name}'`);
        if (address) updateValues.push(`address = '${address}'`);
        if (year_established) updateValues.push(`year_established = '${year_established}'`);
        if (email) updateValues.push(`email = '${email}'`);

        if (!updateValues.length) return;

        return `
            UPDATE school
            SET ${updateValues.join(', ')}
            WHERE id = ${id};
        `
    },
    deleteSchool: (id) => {
        return `
            DELETE FROM
                school
            WHERE id = ${id};
        `
    }
}