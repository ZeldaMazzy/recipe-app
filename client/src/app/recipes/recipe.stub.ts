import { Ingredient } from "../shared/models/ingredient";
import { Recipe } from "../shared/models/recipe";

export const CHANA_MASALA_INGREDIENTS: Ingredient[] = [
    {
        IngredientId: 1,
        Name: "Chickpea",
        Quantity: 16,
        Unit: "Ounce"
    },
    {
        IngredientId: 2,
        Name: "Onion",
        Quantity: 1,
        Unit: ""
    },
    {
        IngredientId: 3,
        Name: "Tomato",
        Quantity: 1,
        Unit: ""
    },
    {
        IngredientId: 4,
        Name: "Chilis, Crushed",
        Quantity: 1,
        Unit: "Tbsp"
    }
];
export const CEREAL_INGREDIENTS: Ingredient[] = [
    {
        IngredientId: 5,
        Name: "Milk",
        Quantity: 8,
        Unit: "Ounce"
    },
    {
        IngredientId: 6,
        Name: "Cereal",
        Quantity: 8,
        Unit: "Ounce"
    }
];
export const SMOOTIE_INGREDIENTS: Ingredient[] = [
    {
        IngredientId: 5,
        Name: "Milk",
        Quantity: 8,
        Unit: "Ounce"
    },
    {
        IngredientId: 6,
        Name: "Frozen Fruit",
        Quantity: 1,
        Unit: "Cup"
    },
    {
        IngredientId: 7,
        Name: "Yogurt",
        Quantity: 6,
        Unit: "Ounce"
    }
];

export const RECIPES: Recipe[] = [
    {
        RecipeId: 1,
        Title: "Chana Masala",
        Intro: "This is an intro. I will keep it as short as possible, but you know how these things go.",
        Ingredients: CHANA_MASALA_INGREDIENTS,
        Steps: [
            "Sautee the onions",
            "Cook the chickpeas",
            "Voila"
        ],
        Tags: ["Vegan", "Indian", "Spicy", "Chickpea"],
        RecipeUrl: "chana-masala",
        PhotoUrl: "https://unsplash.com/photos/owkrXxo5vdA"
    },
    {
        RecipeId: 2,
        Title: "Cereal",
        Intro: "This is an intro. I will keep it as short as possible, but you know how these things go.",
        Ingredients: CEREAL_INGREDIENTS,
        Steps: [
            "Pour the cereal",
            "Pour the milk",
            "Eat the spoon",
            "Do you really need steps for this?"
        ],
        Tags: ["Cereal", "Oat", "Breakfast"],
        RecipeUrl: "cereal",
        PhotoUrl: "https://unsplash.com/photos/chp1ITgplkA"
    },
    {
        RecipeId: 3,
        Title: "Fruit Smoothie",
        Intro: "This is an intro. I will keep it as short as possible, but you know how these things go.",
        Ingredients: SMOOTIE_INGREDIENTS,
        Steps: [
            "Pour the milk",
            "Add the yogurt",
            "Add more fruit than you need",
            "Blend"
        ],
        Tags: ["Smoothie", "Healthy", "Fruit", "Blender"],
        RecipeUrl: "fruit-smoothie",
        PhotoUrl: "https://unsplash.com/photos/pPhN8HFzkDE"
    },
];