import { DEFAULT_RECIPE } from './../recipe.stub';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-single-recipe-container',
  templateUrl: './single-recipe-container.component.html',
  styleUrls: ['./single-recipe-container.component.scss']
})
export class SingleRecipeContainerComponent implements OnInit, OnDestroy {
  
  public recipe: Recipe = {...DEFAULT_RECIPE}
  private destroy$: Subject<void> = new Subject();

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    const url: string = this.route.snapshot.params['recipe-id'];
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
