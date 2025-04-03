// globally save username and favourite recipes
import Recipe from "@/models/Recipe";
export const sharedData = {
    username: '',
    favRecipes: [] as Recipe[],
  };
