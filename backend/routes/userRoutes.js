const express = require('express');
const registerUser = require('../models/userModel');
const loginUser = require('../models/authModel');
const saveRecipe = require('../models/saveRecipeModel');
const favouriteRecipe = require('../models/favouriteRecipeModel');
const unfavouriteRecipe = require('../models/unfavouriteRecipeModel');
const retrieveFavouriteRecipes = require('../models/retrieveFavouriteRecipesModel');

const router = express.Router();
const cors = require('cors'); // Import cors

router.use(cors());

// POST /user/register: Register a new user
router.post('/register', async (req, res) => {
    const { name, username, password } = req.body;
    try {
        const newUser = await registerUser(name, username, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// POST /user/login: Handle login
// In your express router file (auth.js)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const storedPassword = await loginUser(username); // Retrieve password from DB for the username
        
        if (!storedPassword) {
            // If no user was found, return a 401 status with an error
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        if (storedPassword === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
});


router.post('/storerecipe', async (req, res) => {
    const { name } = req.body;
    console.log('Received name:', name); // Log the received name
    try {
        const recipe = await saveRecipe(name);
        res.status(200).json({ message: 'Recipe saved successfully', recipe });
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({ error: 'Failed to store recipe' });
    }
});

router.post('/favouriterecipe', async (req, res) => {
    const { username, recipe_name, ingredients, link, image, uri } = req.body;
    try {
        const recipe = await favouriteRecipe(username, recipe_name, ingredients, link, image, uri );
        res.status(200).json({ message: 'Favourited recipe saved successfully', recipe });
    } catch (error) {
        console.error('Error favouriting recipe:', error);
        res.status(500).json({ error: 'Failed to favourite recipe' });
    }
});

// endpoint to remove favourites recipe relationship from db
router.post('/unfavouriterecipe', async (req, res) => {
    const { username, link } = req.body;
    try {
        const recipe = await unfavouriteRecipe(username, link);
        res.status(200).json({ message: 'Unfavourited recipe saved successfully', recipe });
    } catch (error) {
        console.error('Error unfavouriting recipe:', error);
        res.status(500).json({ error: 'Failed to unfavourite recipe' });
    }
});

// endpoint to retrieve user's favourited recipes
router.post('/retrievefavouriterecipes', async (req, res) => {
    const { username } = req.body;
    try {
        const recipe = await retrieveFavouriteRecipes(username);
        console.log("Retrieved recipe from db", recipe)
        res.status(200).json({ message: 'Retrieved favourited recipes successfully', recipe });
    } catch (error) {
        console.error('Failed to retrieve favourited recipes', error);
        res.status(500).json({ error: 'Failed to retrieve favourited recipes' });
    }
});


module.exports = router;
