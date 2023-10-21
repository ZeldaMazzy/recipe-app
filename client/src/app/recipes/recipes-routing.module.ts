import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { SingleRecipeContainerComponent } from './single-recipe-container/single-recipe-container.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent
  },
  {
    path: ':recipe-id',
    component: SingleRecipeContainerComponent,
    children: [
      { path: 'details', component: ViewRecipeComponent },
      { path: 'edit', component: AddRecipeComponent }
    ]
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
