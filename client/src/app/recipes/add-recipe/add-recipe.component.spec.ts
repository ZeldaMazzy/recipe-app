import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeComponent } from './add-recipe.component';
import { RecipeService } from '../recipe.service';
import { RECIPES } from '../recipe.stub';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('AddRecipeComponent', () => {
  let component: AddRecipeComponent;
  let service: RecipeService;
  let routerMock: Router;

  beforeEach(() => {
    service = jasmine.createSpyObj("RecipeService", {
      getRecipeByUrl: of(RECIPES[0]),
      editRecipe: of(RECIPES[0]),
      createRecipe: of(RECIPES[0])
    });

    routerMock = jasmine.createSpyObj("Router", {
      navigate: undefined
    })
  })

  describe("Isolated Tests", () => {
    beforeEach(() => {
      component = new AddRecipeComponent(service, new ActivatedRoute(), routerMock, new FormBuilder());
    })

    it("should create the component", () => {
      expect(component).toBeTruthy();
    })
  })

  describe("DOM", () => {
    let fixture: ComponentFixture<AddRecipeComponent>;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ AddRecipeComponent ]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(AddRecipeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })
});
