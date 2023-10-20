import { DEFAULT_INGREDIENT } from './../recipe.stub';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/shared/models/recipe';
import { DEFAULT_RECIPE } from '../recipe.stub';
import { Ingredient } from 'src/app/shared/models/ingredient';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  public recipeForm: FormGroup = new FormGroup({});
  @Input("recipe")
  public recipe: Recipe = {...DEFAULT_RECIPE}

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const r: Recipe = this.recipe;
    this.fb.group({
      Title: [r.Title, this.getValidators(3, 50)],
      Description: [r.Description, this.getValidators(3, 500)],
      Intro: [r.Intro, this.getValidators(3, 2000)],
      Ingredients: this.fb.array([]),
      Steps: this.fb.array([]),
      Tags: this.fb.array([])
    })

    this.initializeFormArrays();
  }

  private initializeFormArrays(): void {
    this.recipe.Ingredients.forEach(ing => {
      this.addIngredient(ing);
    })

    this.recipe.Steps.forEach(step => {
      this.addStep(step);
    })

    this.recipe.Tags.forEach(tag => {
      this.addTag(tag)
    })
  }

  private getValidators(min: number, max: number): Validators[] {
    return [
      Validators.required, Validators.minLength(min), Validators.maxLength(max)
    ]
  }

  public addIngredient(ing: Ingredient = {...DEFAULT_INGREDIENT}) {
    const ingForm = this.fb.group({
      Name: [ing.Name, this.getValidators(1, 25)],
      Quantity: [ing.Quantity, Validators.required],
      Unit: [ing.Unit, this.getValidators(1, 25)],
    });
    (this.recipeForm.get("Ingredients") as FormArray).push(ingForm)
  }

  public addStep(step: string = ""): void {
    const stepControl: FormControl = this.fb.control({
      Step: [step, this.getValidators(1, 1000)]
    });
    (this.recipeForm.get("Steps") as FormArray).push(stepControl)
  }

  public addTag(tag: string = ""): void {
    const tagControl: FormControl = this.fb.control({
      Tag: [tag, this.getValidators(1, 50)]
    });
    (this.recipeForm.get("Tags") as FormArray).push(tagControl)
  }
}
