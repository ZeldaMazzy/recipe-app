import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe';
import { DEFAULT_RECIPE } from '../recipe.stub';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent {

  @Input("recipe")
  public recipe: Recipe = {...DEFAULT_RECIPE};
  @Output("deleteRecipeEvent")
  public deleteRecipeEvent: EventEmitter<void> = new EventEmitter()

  public deleteRecipe(): void {
    const confirmDelete = confirm("Are you sure you want to delete this recipe?");
    if(!confirmDelete) return;

    this.deleteRecipeEvent.emit();
  }
}
