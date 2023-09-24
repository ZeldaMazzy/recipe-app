import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../recipe.service';
import { Subscription, of, Observable, throwError } from 'rxjs';
import { RECIPES } from '../recipe.stub';
import { RouterTestingModule } from '@angular/router/testing';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let service: RecipeService

  beforeEach(() => {
    service = jasmine.createSpyObj("RecipeService", {
      getRecipes: of(RECIPES),
      deleteRecipe: of(true)
    })
  })

  describe("Isolated Tests", () => {
    beforeEach(() => {
      component = new RecipeListComponent(service);
    })

    it("should create the component", () => {
      expect(component).toBeTruthy();
    });

    it("should get the list of recipes when getRecipes() is called", () => {
      //arrange
      component.recipes = [];

      //act
      component["getRecipes"]();

      //assert
      expect(component.recipes).toEqual(RECIPES);
      expect(service.getRecipes).toHaveBeenCalled();
    });

    it("should display an error if there is an issue with getRecipes()", () => {
      //arrange
      spyOn(console, "error");
      spyOn(window, "alert");
      service.getRecipes = jasmine.createSpy()
        .and.returnValue(throwError(() => new Error()))
      component.recipes = [];

      //act
      component["getRecipes"]();

      //assert
      expect(component.recipes).toHaveSize(0);
      expect(service.getRecipes).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
    })

    it("should only call the recipe service if the user confirms when deleteRecipe is called", () => {
      //arrange
      const confirmSpy: jasmine.Spy = spyOn(window, "confirm").and.returnValue(true);

      //act
      component.deleteRecipe(1);

      //assert
      expect(service.deleteRecipe).toHaveBeenCalledWith(1);
      confirmSpy.calls.reset();
    })

    it("should not call the recipe service if the user cancels the deletion", () => {
      //arrange
      const confirmSpy: jasmine.Spy = spyOn(window, "confirm")
        .and.returnValue(true);
      spyOn(console, "error");
      spyOn(window, "alert");
      service.deleteRecipe = jasmine.createSpy()
        .and.returnValue(throwError(() => new Error()))

      //act
      component.deleteRecipe(1);

      //assert
      expect(service.deleteRecipe).toHaveBeenCalledWith(1);
      expect(console.error).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
      confirmSpy.calls.reset();
    });

    it("should display an error if there was an issue deleting a recipe", () => {
      //arrange
      const confirmSpy: jasmine.Spy = spyOn(window, "confirm").and.returnValue(true);

      //act
      component.deleteRecipe(1);

      //assert
      expect(service.deleteRecipe).toHaveBeenCalledWith(1);
      confirmSpy.calls.reset();
    });

    it("should destroy all subscriptions when ngOnDestroy is called", () => {
      //arrange
      component["destroy$"].subscribe({
        //assert
        next: d => expect(d).toBeUndefined()
      })

      //act
      component.ngOnDestroy();
    })
  })

  describe("DOM Tests", () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ RecipeListComponent ],
        imports: [RouterTestingModule],
        providers: [{provide: RecipeService, useValue: service}]
      })
      .compileComponents();

      fixture = TestBed.createComponent(RecipeListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  })

});
