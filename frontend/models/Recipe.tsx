//models/Recipe.tsx
class Recipe {
    name: string;
    ingredients: string[];
    link: string;
    image: string;

    constructor(name: string, ingredients: string[], link: string, image: string) {
        this.name = name;
        this.ingredients = ingredients;
        this.link = link;
        this.image = image;
    }

    getName(){
        return this.name
    }

    getIngredients() {
        return this.ingredients
    }

    getLink(){
        return this.link
    } 

    getImage() {
        return this.image
    }

}

export default Recipe