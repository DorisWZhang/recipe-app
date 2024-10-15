type Ingredient = {
    text: string;
    quantity: number;
    measure: string;
    food: string;
    weight: number;
    foodCategory: string;
    foodId: string;
    image: string;
  };
  
  class Recipe {
    name: string;
    ingredients: Ingredient[];
    link: string;
    image: string;
  
    constructor(name: string, ingredients: Ingredient[], link: string, image: string) {
      this.name = name;
      this.ingredients = ingredients;
      this.link = link;
      this.image = image;
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
  }
  
  

export default Recipe