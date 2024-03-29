import { Ingredient } from "../shared/models/ingredient";
import { CreateRecipe, Recipe } from "../shared/models/recipe";

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

export const PIZZA_INGREDIENTS: Ingredient[] = [
    {
        IngredientId: 8,
        Name: "Crust",
        Quantity: 1,
        Unit: "Crust"
    },
    {
        IngredientId: 9,
        Name: "Pizza Sauce",
        Quantity: .5,
        Unit: "Cup"
    },
    {
        IngredientId: 10,
        Name: "Cheese",
        Quantity: .5,
        Unit: "Cup"
    }
]

export const RECIPES: Recipe[] = [
    {
        RecipeId: "chana-masala-01",
        Title: "Chana Masala",
        Description: "The greatest Indian dish in the Universe",
        Intro: "This is an intro. I will keep it as short as possible, but you know how these things go.",
        Ingredients: CHANA_MASALA_INGREDIENTS,
        Steps: [
            "Sautee the onions",
            "Cook the chickpeas",
            "Voila"
        ],
        Tags: ["Vegan", "Indian", "Spicy", "Chickpea"],
        PhotoUrl: "https://images.unsplash.com/photo-1587033649773-5c231faa21e3"
    },
    {
        RecipeId: "cereal-02",
        Title: "Cereal",
        Description: "The breakfast of champs",
        Intro: "This is an intro. I will keep it as short as possible, but you know how these things go.",
        Ingredients: CEREAL_INGREDIENTS,
        Steps: [
            "Pour the cereal",
            "Pour the milk",
            "Eat the spoon",
            "Do you really need steps for this?"
        ],
        Tags: ["Cereal", "Oat", "Breakfast"],
        PhotoUrl: "https://images.unsplash.com/photo-1504308805006-0f7a5f1f0f71"
    },
    {
        RecipeId: "fruit-smoothie-03",
        Title: "Fruit Smoothie",
        Description: "See you in hell, fruit",
        Intro: "This is an intro. I will keep it as short as possible, but you know how these things go.",
        Ingredients: SMOOTIE_INGREDIENTS,
        Steps: [
            "Pour the milk",
            "Add the yogurt",
            "Add more fruit than you need",
            "Blend"
        ],
        Tags: ["Smoothie", "Healthy", "Fruit", "Blender"],
        PhotoUrl: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054"
    },
];

export const DEFAULT_RECIPE: Recipe = {
    RecipeId: "",
    Title: "",
    Description: "",
    Intro: "",
    Ingredients: [],
    Steps: [],
    Tags: [],
    PhotoUrl: ""
}

export const DEFAULT_INGREDIENT: Ingredient = {
    IngredientId: -1,
    Name: "",
    Quantity: 0,
    Unit: ""
}

export const CREATE_RECIPE: CreateRecipe = {
    Title: "Pizza",
    Description: "A tasty cheese pizza",
    Intro: "Why are recipe intros so long? Does anybody even read these? I feel like so many times I open up a recipe blog and it's inundated with the author's entire life story. Just write a memoir.",
    Ingredients: [...PIZZA_INGREDIENTS],
    Steps: ["Flatten the crust", "Spread on the sauce and cheese", "Bake at 350 for 15 minutes", "Burn the roof of your mouth because you didn't let it cool down in time"],
    Tags: ["Pizza","Italian", "Pie", "Cheese Pizza", "Cheese"],
    RecipeUrl: "cheese-pizza",
    PhotoUrl: "https://images.unsplash.com/photo-1620374645498-af6bd681a0bd"
}