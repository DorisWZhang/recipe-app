const express = require('express');
const registerUser = require('../models/userModel');

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

// POST /user/login: Handle login (you can implement this later)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        
        res.status(200).json({ message: 'Login functionality coming soon' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

module.exports = router;
