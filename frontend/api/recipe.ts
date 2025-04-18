import { sharedData } from "@/components/SharedData";
import Recipe
 from "@/models/Recipe";

// Fetch favourite recipes from DB
export const fetchFavRecipes = async () => {
    const userName = sharedData.username;
    try {
        const response = await fetch('http://localhost:3000/user/retrievefavouriterecipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userName }),
        });

        const data = await response.json();
        console.log(data.recipe);
        console.log("Received data from the server:", data);

        // Check if the response contains an array of recipes
        if (Array.isArray(data.recipe)) {
            // Parse recipes into structured list
            const parsedRecipes = data.recipe.map(recipe => new Recipe(
                recipe.name,
                recipe.ingredients, 
                recipe.link,
                recipe.image,
            ));

            // set recipes to favourited
            parsedRecipes.forEach(recipe => {
                recipe.setFavourited(true);
                console.log("favourited status", recipe.getFavourited());
            });
            // Update state with fetched recipes
            sharedData.favRecipes = parsedRecipes;
            console.log("Parsed and saved favourite recipes:", sharedData.favRecipes);
        } else {
            alert("Failed to retrieve favourite recipes.");
        }

    } catch (error) {
        console.error('Error fetching favourite recipes:', error);
        alert("Failed to fetch favourite recipes.");
    }
};