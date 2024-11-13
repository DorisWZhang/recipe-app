const pool = require('../dbConfig');

// save it to the database
const registerUser = async (_name, username, password) => {
    try {
        const result = await pool.query(
            'INSERT INTO accounts (name, username, password) VALUES ($1, $2, $3) RETURNING *',
            [_name, username, password]
        );
        return result.rows[0]; // return newly created user
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};
