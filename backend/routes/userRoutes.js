const express = require('express');

// like a mini application
const router = express.Router();
const cors = require('cors'); // Import cors

router.use(cors());

router
    .route("/register")
    // more efficient than post
    .get((req,res) => {

    })
    // post can take large amounts of data, data is sent in body
    .post( async (req,res) => {
        const { name, username, password } = req.body;
        try {
            const newUser = await registerUser(name, username, password);
            res.status(201).json({ message: 'User registered successfully', user: newUser });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to register user' });
        }
    });


router
    .route("/login")
    .get((req,res) => {

    })
    .post((req,res) => {

    })

module.exports = router;



