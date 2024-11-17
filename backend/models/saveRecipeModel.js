console.log('saveRecipeModel loaded');

const pool = require('../dbConfig');

const saveRecipe = async (name) => {
    try {
        const result = await pool.query(
            'INSERT INTO recipes (name) VALUES ($1) RETURNING *',
            [name]
        );
        if (result.rows.length > 0) {
            console.log('Inserted recipe:', result.rows[0]);  // Log inserted recipe
        } else {
            console.log('No rows returned from query');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error inserting recipe:', error);
        throw error;
    }
};


module.exports = saveRecipe;

