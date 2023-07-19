import { Injectable } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';
import { CreateRecipe, Recipe } from '../shared/models/recipe';
import { RECIPES } from './recipe.stub';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private readonly url: string = "https://jsonplaceholder.typicode.com";
  constructor(private http: HttpClient){}

  public getRecipes(): Observable<Recipe[]> { 
    return this.http.get<Recipe[]>(this.url + "/posts")
    .pipe(map(() => RECIPES))
  }

  public getRecipeByUrl(url: string): Observable<Recipe | null> {
    const recipe: Recipe | undefined = RECIPES.find(r => r.RecipeUrl === url);
    if(!recipe) return of(null)
    return this.http.get<Recipe[]>(this.url + "/posts/" + recipe.RecipeId)
    .pipe(map(() => recipe))
  }

  public createRecipe(newRecipe: CreateRecipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.url + "/posts", newRecipe)
    .pipe(map(() => {return {RecipeId: 4, ...newRecipe}}))
  }

  public editRecipe(recipe: Recipe): Observable<Recipe> {
    const id: number = recipe.RecipeId;
    return this.http.patch<Recipe>(this.url + "/posts/" + id, recipe)
    .pipe(map(() => recipe))
  }

  public deleteRecipe(recipeId: number): Observable<boolean> {
    return this.http.delete<any>(this.url + "/posts/" + recipeId)
    .pipe(map(res => !!res))
  }
}
