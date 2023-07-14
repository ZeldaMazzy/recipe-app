import { Ingredient } from "./ingredient";

export interface Recipe {
    RecipeId: number
    Title: string;
    Intro: string;
    Ingredients: Ingredient[];
    Steps: string[];
    Tags: string[];
    RecipeUrl: string;
    PhotoUrl?: string | null;
}