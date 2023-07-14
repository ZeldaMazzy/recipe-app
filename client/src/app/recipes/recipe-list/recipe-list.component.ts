import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Subscription, finalize } from 'rxjs';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[] = [];
  public doneLoading: boolean = false;
  private allRecipesSubscription$: Subscription = new Subscription();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.allRecipesSubscription$ = this.recipeService.getRecipes()
    .pipe(finalize(() => this.doneLoading = true))
    .subscribe({
      next: recipes => this.recipes = recipes,
      error: () => console.error("There was an error fetching the recipes")
    })
  }

  ngOnDestroy(): void {
    this.allRecipesSubscription$.unsubscribe();
  }
}
