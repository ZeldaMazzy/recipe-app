import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from 'src/app/shared/models/recipe';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {

  public recipe!: Recipe;
  private recipeSubscription$: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    const url: string = this.route.snapshot.params['recipe-url'];
    this.recipeService.getRecipeByUrl(url)
    .subscribe({
      next: r => {
        if(r) this.recipe = r;
      }
    })
  }

}
