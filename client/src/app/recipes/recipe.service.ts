import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Recipe } from '../shared/models/recipe';
import { RECIPES } from './recipe.stub';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  public getRecipes(): Observable<Recipe[]> {
    return of(RECIPES).pipe(
      delay(2000)
    )
  }

  public getRecipeByUrl(url: string): Observable<Recipe | null> {
    const recipe: Recipe | undefined = RECIPES.find(r => r.RecipeUrl === url);
    return of(recipe || null)
  }
}
