console.log('unfavouriteRecipeModel loaded');

const pool = require('../dbConfig');

const unfavouriteRecipe = async (username, link) => {
    try {
        const result = await pool.query(
            'DELETE FROM favourited_recipes WHERE username = $1 AND link = $2 RETURNING *',
            [username, link]
        );
        if (result.rows.length > 0) {
            console.log('Unfavourited recipe:', result.rows[0]);  // Log unfavourited recipe
        } else {
            console.log('No rows returned from query');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error unfavouriting recipe:', error);
        throw error;
    }
};


module.exports = unfavouriteRecipe;

