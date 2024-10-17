import { NativeModules } from "react-native";
import Recipe from "../models/Recipe";
class Account {
    name: string;
    username: string;
    password: string;
    favourited: Recipe[]


    // make favourited optional
    constructor(name: string, username: string, password: string, favourited = []) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.favourited = favourited; // default to no saved favourites
    }

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