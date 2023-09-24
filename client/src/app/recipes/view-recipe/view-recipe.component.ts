import { Subject, Subscription, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';
import { DEFAULT_RECIPE } from '../recipe.stub';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit, OnDestroy {

  public recipe: Recipe = {...DEFAULT_RECIPE};
  private destroy$: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    const url: string = this.route.snapshot.params['recipe-url'];
    this.getRecipeByUrl(url);
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
  }

  private getRecipeByUrl(url: string): void {
    this.recipeService.getRecipeByUrl(url)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: r => {
        if(r) this.recipe = r;
      },
      error: (err: Error) => {
        console.error("There was an error fetching the recipe: ", err);
        alert("There was an error fetching the recipe: " + err.message);
      }
    })
  }

  public deleteRecipe(): void {
    const confirmDelete = confirm("Are you sure you want to delete this recipe?");

    if(!confirmDelete) return;

    this.recipeService.deleteRecipe(1)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {},
        error: (err: Error) => {
          console.error("There was an error deleting the recipe: ", err);
          alert("There was an error deleting the recipe: " + err.message);
        }
      });
  }
}
