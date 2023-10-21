import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent
  },
  {
    path: ':recipe-id/details',
    component: ViewRecipeComponent,
  },
  { 
    path: ':recipe-id/edit', 
    component: AddRecipeComponent 
  },
  {
    path: 'new-recipe',
    component: AddRecipeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
