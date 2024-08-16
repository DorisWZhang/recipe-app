// Filename - index.js

// Requiring the modules
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000; // You can change the port if needed

// Replace these with your actual Edamam API credentials
const EDAMAM_APP_ID = '3153c55e';
const EDAMAM_APP_KEY = '6ce106f71f98c6c0a1f9a630bf9fc316';

// Route to search for recipes
app.get('/search', async (req, res) => {
  try {
    const {
      q,
      type = 'public',
      ingr,
      diet,
      health,
      cuisineType,
      mealType,
      dishType,
      calories,
      time,
      imageSize,
      glycemicIndex,
      inflammatoryIndex,
      excluded,
      random,
      ...nutrients
    } = req.query;

    // Construct the query parameters dynamically
    const queryParams = {
        type,
        app_id: EDAMAM_APP_ID,
        app_key: EDAMAM_APP_KEY,
        ...(q && { q }), // Only add 'q' if it is present
        ...(ingr && { ingr }),
        ...(diet && { diet }),
        ...(health && { health }),
        ...(cuisineType && { cuisineType }),
        ...(mealType && { mealType }),
        ...(dishType && { dishType }),
        ...(calories && { calories }),
        ...(time && { time }),
        ...(imageSize && { imageSize }),
        ...(glycemicIndex && { glycemicIndex }),
        ...(inflammatoryIndex && { inflammatoryIndex }),
        ...(excluded && { excluded }),
        ...(random && { random }),
        ...nutrients
      };

    // Construct the full API URL
    const apiUrl = 'https://api.edamam.com/api/recipes/v2';
    const url = new URL(apiUrl);
    Object.keys(queryParams).forEach(key => {
      if (queryParams[key]) {
        url.searchParams.append(key, queryParams[key]);
      }
    });

    // Make the HTTP request to the Edamam API
    const response = await axios.get(url.toString());

    // Return the response data to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the recipes.');
  }
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
