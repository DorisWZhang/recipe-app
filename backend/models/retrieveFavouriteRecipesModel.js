console.log('retrieveFavouriteRecipesModel loaded');

const pool = require('../dbConfig');

// upon login, fetch the users saved recipes
const retrieveFavouriteRecipes = async (username) => {;
    try {
        const result = await pool.query(
            'SELECT link FROM favourited_recipes WHERE username = $1',
            [username]
        );

        if (result.rows.length > 0) {
            console.log('Favourited recipe:', result.rows[0]);  // Log favourited recipe

            // !!! link is not defined
            //return result.rows.map(row => row.link);

            // Map the rows to extract the links
            

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

