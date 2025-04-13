console.log('retrieveFavouriteRecipesModel loaded');

const pool = require('../dbConfig');

// upon login, fetch the users saved recipes
const retrieveFavouriteRecipes = async (username) => {;
    try {
        const result = await pool.query(
            'SELECT username, name, ingredients, link, image, uri FROM favourited_recipes WHERE username = $1',
            [username]
        );

        if (result.rows.length > 0) {
            console.log('Favourited recipe:', result.rows[0]);  // Log favourited recipe
            console.log('Ingredients type:', typeof result.rows[0].ingredients);
            console.log('Ingredients type:', result.rows[0].ingredients);
            if (typeof result.rows[0].ingredients === 'object' && !Array.isArray(result.rows[0].ingredients)) {
                result.rows[0].ingredients = Object.values(result.rows[0].ingredients);
            }

        } else {
            console.log('No rows returned from query');
            
            
        }
        return result.rows;
        
    } catch (error) {
        console.error('Error favouriting recipe:', error);
        throw error;
    }
};


module.exports = retrieveFavouriteRecipes;

