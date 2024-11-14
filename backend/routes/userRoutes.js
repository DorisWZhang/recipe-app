const express = require('express');
const registerUser = require('../models/userModel');
const loginUser = require('../models/authModel');

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
    //console.log('post request successful');
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





module.exports = router;
