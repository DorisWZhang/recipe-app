console.log('favouriteRecipeModel loaded');

const pool = require('../dbConfig');

const favouriteRecipe = async (username, link) => {
    try {
        const result = await pool.query(
            'INSERT INTO favourited_recipes (username, link) VALUES ($1 , $2) RETURNING *',
            [username, link]
        );
        if (result.rows.length > 0) {
            console.log('Favourited recipe:', result.rows[0]);  // Log favourited recipe
        } else {
            console.log('No rows returned from query');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error favouriting recipe:', error);
        throw error;
    }
};


module.exports = favouriteRecipe;

