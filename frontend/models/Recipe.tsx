
  
  class Recipe {
    name: string;
    ingredients: string[];
    link: string;
    image: string;
    favourited: boolean;
    uri: string;

    constructor(name: string, ingredients: string[], link: string, image: string) {
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