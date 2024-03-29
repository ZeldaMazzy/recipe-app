import { Ingredient } from "./ingredient";

export interface Recipe {
    RecipeId: string;
    Title: string;
    Description: string;
    Intro: string;
    Ingredients: Ingredient[];
    Steps: string[];
    Tags: string[];
    PhotoUrl: string;
}

export interface CreateRecipe {
    Title: string;
    Description: string;
    Intro: string;
    Ingredients: Ingredient[];
    Steps: string[];
    Tags: string[];
    RecipeUrl: string;
    PhotoUrl: string;
}