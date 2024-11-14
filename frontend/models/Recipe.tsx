type Ingredient = {
    text: string;
    quantity: number;
    measure: string;
    food: string;
    weight: number;
    foodCategory: string;
    foodId: string;
    image: string;
    favourited: boolean;
  };
  
  class Recipe {
    name: string;
    ingredients: Ingredient[];
    link: string;
    image: string;
    favourited: boolean;

    constructor(name: string, ingredients: Ingredient[], link: string, image: string) {
      this.name = name;
      this.ingredients = ingredients;
      this.link = link;
      this.image = image;
      this.favourited = false;
    }
  
    getName() {
      return this.name;
    }
  
    getIngredients() {
      return this.ingredients;
    }
  
    getLink() {
      return this.link;
    }
  
    getImage() {
      return this.image;
    }

    getFavourited() {
        return this.favourited;
    }

    getNumIngredients() {
      return this.getIngredients().length;
    }
  }
  

  

export default Recipe