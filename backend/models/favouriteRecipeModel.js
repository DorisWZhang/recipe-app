console.log('favouriteRecipeModel loaded');

const pool = require('../dbConfig');

const favouriteRecipe = async (username, recipe_name, ingredients, link, image, uri) => {
    try {
        // Improved logging for debugging
        console.log('Favouriting recipe:');
        console.log('Username:', username);
        console.log('Recipe Name:', recipe_name);
        console.log('Ingredients:', ingredients);
        console.log('Link:', link);
        console.log('Image:', image);
        console.log('URI:', uri);

        // Insert the recipe into the database
        const result = await pool.query(
            'INSERT INTO favourited_recipes (username, name, ingredients, link, image, uri) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [username, recipe_name, ingredients, link, image, uri]
        );

        if (result.rows.length > 0) {
            console.log('Favourited recipe:', result.rows[0]);  // Log favourited recipe if successful
            return result.rows[0];
        } else {
            console.log('No rows returned from query');
            return null;
        }
    } catch (error) {
        // Enhanced error logging with detailed information
        console.error('Error favouriting recipe:', error.message);
        console.error('Stack trace:', error.stack);
        throw error;
    }
};

module.exports = favouriteRecipe;
