import { Subscription } from 'rxjs';
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
  private recipeSubscription$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    const url: string = this.route.snapshot.params['recipe-url'];

    this.recipeSubscription$ = this.recipeService.getRecipeByUrl(url)
    .subscribe({
      next: r => {
        if(r) this.recipe = r;
      }
    })
  }

  ngOnDestroy(): void {
    this.recipeSubscription$.unsubscribe();
  }

}
