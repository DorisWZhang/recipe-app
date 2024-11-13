// In authModel.js, loginUser function

console.log('authModel loaded');

const pool = require('../dbConfig');

const loginUser = async (username) => {
    try {
        const result = await pool.query(
            'SELECT password FROM accounts WHERE username = $1',
            [username]
        );
        
        if (result.rows.length === 0) {
            // If no user found, return null or undefined
            return null;
        }
        
        return result.rows[0].password;
    } catch (error) {
        console.error('Error getting password:', error.message);
        throw error;
    }
};

module.exports = loginUser;
