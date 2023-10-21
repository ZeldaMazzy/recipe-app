import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleRecipeContainerComponent } from './single-recipe-container/single-recipe-container.component';


@NgModule({
  declarations: [
    ViewRecipeComponent,
    RecipeListComponent,
    AddRecipeComponent,
    SingleRecipeContainerComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
