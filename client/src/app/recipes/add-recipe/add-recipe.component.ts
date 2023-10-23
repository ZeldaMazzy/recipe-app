import { DEFAULT_INGREDIENT } from './../recipe.stub';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from 'src/app/shared/models/recipe';
import { DEFAULT_RECIPE } from '../recipe.stub';
import { Ingredient } from 'src/app/shared/models/ingredient';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, first, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit, OnDestroy {

  @Input("recipe")
  public recipe: Recipe = {...DEFAULT_RECIPE}
  public recipeForm: FormGroup = new FormGroup({});
  public componentState: number = State.LOADING;

  private destroy$: Subject<void> = new Subject();

  constructor(  private recipeService: RecipeService, 
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder) {}

  ngOnInit(): void {
    if(!this.route.snapshot.params["recipe-id"]) {
      this.buildForm();
      this.componentState = State.CREATE;
      return;
    }

    this.getSelectedRecipeAndBuildForm();
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  public createNewRecipe(): void {
    console.log("adding!")
    if(this.recipeForm.invalid) return;
    console.log("valid")

    this.componentState = State.LOADING;
    console.log("making request: ", this.recipeForm.value);
    this.recipeService.createRecipe(this.recipeForm.value)
      .pipe(takeUntil(this.destroy$), first())
      .subscribe({
        next: r => this.router.navigate([r.RecipeId, 'details']),
        error: err => {
          console.error("There was an error: ", err);
          this.componentState = State.CREATE;
        }
      })
  }

  public editRecipe(): void {
    console.log("editing!")
    if(this.recipeForm.invalid) return;

    console.log("Valid")
    const request: Recipe = {
      RecipeId: this.recipe.RecipeId,
      ...this.recipeForm.value
    }
    this.componentState = State.LOADING
    console.log("making request: ", request)
    this.recipeService.editRecipe(request)
      .pipe(takeUntil(this.destroy$), first())
      .subscribe({
        next: () => this.router.navigate([this.recipe.RecipeId, 'details']),
        error: err => {
          console.error("There was an error: ", err);
          this.componentState = State.EDIT;
        }
      })
  }

  private getSelectedRecipeAndBuildForm(): void {
    const recipeId: string = this.route.snapshot.params["recipe-id"];
    this.recipeService.getRecipeByUrl(recipeId)
      .pipe(
        takeUntil(this.destroy$),
        first(),
        finalize(() => this.componentState = State.EDIT)
      )
      .subscribe({
        next: recipe => {
          this.recipe = recipe;
          this.buildForm();
        },
        error: err => console.error("There was an error: ", err)
      })
  }

  private buildForm(): void {
    const r: Recipe = this.recipe;
    this.recipeForm = this.fb.group({
      Title: [r.Title, this.getValidators(3, 50)],
      Description: [r.Description, this.getValidators(3, 500)],
      Intro: [r.Intro, this.getValidators(0, 2000)],
      Ingredients: this.fb.array([]),
      Steps: this.fb.array([]),
      Tags: this.fb.array([])
    })

    this.recipe.Ingredients.forEach(ing => {
      this.addIngredient(ing);
    })

    this.recipe.Steps.forEach(step => {
      this.addStep(step);
    })

    this.recipe.Tags.forEach(tag => {
      this.addTag(tag)
    })

    console.log(this.ingredients.controls[0])
  }

  public addIngredient(ing: Ingredient = {...DEFAULT_INGREDIENT}) {
    const ingForm: FormGroup = this.fb.group({
      Name: [ing.Name, this.getValidators(1, 25)],
      Quantity: [ing.Quantity, Validators.required],
      Unit: [ing.Unit, this.getValidators(1, 25)],
    });
    this.ingredients.push(ingForm)
  }

  public addStep(step: string = ""): void {
    const stepControl: FormControl = this.fb.control({
      Step: [step, this.getValidators(1, 1000)]
    });
    this.steps.push(stepControl)
  }

  public addTag(tag: string = ""): void {
    const tagControl: FormControl = this.fb.control({
      Tag: [tag, this.getValidators(1, 50)]
    });
    this.tags.push(tagControl)
  }

  public get ingredients() { return this.recipeForm.controls["Ingredients"] as FormArray }
  public get steps() { return this.recipeForm.get("Steps") as FormArray }
  public get tags() { return this.recipeForm.get("Tags") as FormArray }

  private getValidators(min: number, max: number): Validators[] {
    return [
      Validators.required, Validators.minLength(min), Validators.maxLength(max)
    ]
  }
}

enum State {
  CREATE,
  EDIT,
  LOADING
}