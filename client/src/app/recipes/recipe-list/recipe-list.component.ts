import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Subject, Subscription, finalize, takeUntil, Observable, of, from } from 'rxjs';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes: Recipe[] = [];
  public doneLoading: boolean = false;
  private destroy$: Subject<void> = new Subject();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getRecipes();
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
  }

  private getRecipes(): void {
    this.doneLoading = false;
    this.recipeService.getRecipes()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.doneLoading = true)
        )
      .subscribe({
        next: recipes => this.recipes = recipes.slice(),
        error: (err: Error) => {
          console.error("There was an error fetching the recipes: ", err);
          alert("There was an error fetching the recipes: " + err.message);
        }
      })
  }

  public deleteRecipe(recipeId: number): void {
    const confirmDelete = confirm("Are you sure you want to delete this recipe?");

    if(!confirmDelete) return;

    this.doneLoading = false;
    this.recipeService.deleteRecipe(1)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.doneLoading = true)
      )
      .subscribe({
        error: (err: Error) => {
          console.error("There was an error deleting the recipe: ", err);
          alert("There was an error deleting the recipe: " + err.message);
        }
      });
  }
}
