import { NativeModules } from "react-native";
import Recipe from "../models/Recipe";
class Account {
    name: string;
    username: string;
    password: string;
    favourited: Recipe[]


    // make favourited optional

    constructor(
        name: string = "", // Default name if not provided
        username: string,
        password: string,
        favourited: any[] = [] // Default to an empty array if no favourites are passed
    ) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.favourited = favourited;
    }

    // define overloaded signatures for the constructor
     
    
    

    updateName(name: string) {
        this.name = name;
    }

    // this should be called when a recipe is hearted on the interface
    addFavourited(recipe: Recipe) {
        this.favourited.push(recipe);
    }
    
    removeFavourited(recipe: Recipe) {
        this.favourited = this.favourited.filter(item => item !== recipe);
    }

};

export default Account;