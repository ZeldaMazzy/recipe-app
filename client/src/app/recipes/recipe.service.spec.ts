import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { RecipeService } from './recipe.service';
import { CREATE_RECIPE, RECIPES } from './recipe.stub';
import { HttpErrorResponse } from '@angular/common/http';
import { Recipe } from '../shared/models/recipe';

describe('RecipeService', () => {
  let service: RecipeService;
  let http: HttpTestingController
  let url: string = "https://jsonplaceholder.typicode.com/posts"

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RecipeService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get a list of recipes when getRecipes is called", () => {
    //act
    service.getRecipes().subscribe({
      next: recipes => expect(recipes).toEqual(RECIPES),
      error: () => fail("GetRecipes test failed. This should not be reached.")
    });

    //assert
    const request: TestRequest = http.expectOne(url);
    expect(request.request.method).toBe("GET");
    request.flush(RECIPES);
  });

  it("should get a single recipe by ID when getRecipeByUrl() is called", () => {
    const recipe: Recipe = {...RECIPES[0]}

    //act
    service.getRecipeByUrl(recipe.RecipeUrl).subscribe({
      next: recipeResponse => expect(recipeResponse).toEqual(recipe),
      error: () => fail("GetRecipeByUrl test failed. This should not be reached.")
    });

    //assert
    const request: TestRequest = http.expectOne(url + "/1");
    expect(request.request.method).toBe("GET");
    request.flush(recipe);
  });

  it("should create a new recipe and return a copy of it from the backend when createNewRecipe is called", () => {
    //act
    service.createRecipe(CREATE_RECIPE).subscribe({
      next: recipe => expect(recipe).toEqual({RecipeId: 4, ...CREATE_RECIPE}),
      error: () => fail("CreateRecipe test failed. This should not be reached.")
    });

    //assert
    const request: TestRequest = http.expectOne(url);
    expect(request.request.method).toBe("POST");
    request.flush(CREATE_RECIPE);
  });

  it("should update an existing recipe when editRecipe() is called", () => {
    //act
    service.editRecipe(RECIPES[0]).subscribe({
      next: recipe => expect(recipe).toEqual(RECIPES[0]),
      error: () => fail("EditRecipe test failed. This should not be reached.")
    });

    //assert
    const request: TestRequest = http.expectOne(url + "/1");
    expect(request.request.method).toBe("PATCH");
    request.flush(RECIPES[0]);
  });

  it("should delete a recipe when deleteRecipe() is called", () => {
    //act
    service.deleteRecipe(1).subscribe({
      next: recipe => expect(recipe).toEqual(true),
      error: () => fail("EditRecipe test failed. This should not be reached.")
    });

    //assert
    const request: TestRequest = http.expectOne(url + "/1");
    expect(request.request.method).toBe("DELETE");
    request.flush({});
  });
});
