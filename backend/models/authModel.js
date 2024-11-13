const pool = require('../dbConfig');

const loginUser = async (username) => {
    try {
        const result = await pool.query(
            'SELECT password FROM accounts WHERE username = $1',
            [username]
        );
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0].passwordS
    } catch (error) {
        console.error('Error getting password', error);
        throw error;
    }
};

module.exports = loginUser;