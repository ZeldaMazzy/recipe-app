import { DEFAULT_RECIPE } from './../recipe.stub';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipeComponent } from './view-recipe.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeService } from '../recipe.service';
import { of, throwError } from 'rxjs';
import { RECIPES } from '../recipe.stub';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ViewRecipeComponent', () => {
  let component: ViewRecipeComponent;
  let fixture: ComponentFixture<ViewRecipeComponent>;
  let service: RecipeService;

  beforeEach(() => {
    service = jasmine.createSpyObj("RecipeService", {
      getRecipeByUrl: of(RECIPES[0]),
      deleteRecipe: of(true)
    });
  })

  describe("Isolated Tests", () => {
    beforeEach(() => {
      component = new ViewRecipeComponent(new ActivatedRoute(), service);
    })

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("should call getRecipeByUrl() with the correct url when the page loads", async () => {
      //arrange 
        const recipeUrl: string = "testing-url";
        const routeSpy: any = { snapshot: { params: { 'recipe-url': recipeUrl }}}

        await TestBed.configureTestingModule({
        declarations: [ ViewRecipeComponent ],
        providers:  [
                      { provide: RecipeService, useValue: service },
                      { provide: ActivatedRoute, useValue: routeSpy }
                    ]
      })
      .compileComponents();
      
      //act
      fixture = TestBed.createComponent(ViewRecipeComponent);
      component = fixture.componentInstance;
      spyOn<any>(component, "getRecipeByUrl");
      component.ngOnInit();

      //assert
      expect(component["getRecipeByUrl"]).toHaveBeenCalledWith(recipeUrl)
    })

    it("should get a single recipe when getRecipeByUrl() is called", () => {
      //arrange
      component.recipe = {...DEFAULT_RECIPE};

      //act
      component["getRecipeByUrl"]("url");

      //assert
      expect(component.recipe).toEqual(RECIPES[0]);
      expect(service.getRecipeByUrl).toHaveBeenCalledWith("url");
    });

    it("should display an error if there is an issue with getRecipeByUrl()", () => {
      //arrange
      spyOn(console, "error");
      spyOn(window, "alert");
      service.getRecipeByUrl = jasmine.createSpy()
        .and.returnValue(throwError(() => new Error()))
      component.recipe = {...DEFAULT_RECIPE};

      //act
      component["getRecipeByUrl"]("url");

      //assert
      expect(component.recipe).toEqual(DEFAULT_RECIPE);
      expect(service.getRecipeByUrl).toHaveBeenCalledWith("url");
      expect(console.error).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
    })

    it("should only call the recipe service if the user confirms when deleteRecipe is called", () => {
      //arrange
      const confirmSpy: jasmine.Spy = spyOn(window, "confirm").and.returnValue(true);

      //act
      component.deleteRecipe();

      //assert
      expect(service.deleteRecipe).toHaveBeenCalled();
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
      component.deleteRecipe();

      //assert
      expect(service.deleteRecipe).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
      confirmSpy.calls.reset();
    });

    it("should display an error if there was an issue deleting a recipe", () => {
      //arrange
      const confirmSpy: jasmine.Spy = spyOn(window, "confirm").and.returnValue(true);

      //act
      component.deleteRecipe();

      //assert
      expect(service.deleteRecipe).toHaveBeenCalled();
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

  describe("DOM", () => {
    let d: DebugElement;
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ ViewRecipeComponent ],
        imports: [RouterTestingModule],
        providers: [{provide: RecipeService, useValue: service}]
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(ViewRecipeComponent);
      component = fixture.componentInstance;
      component.recipe = {...RECIPES[0]}
      fixture.detectChanges();
      d = fixture.debugElement;
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it("should display an image with the correct url, alt and title", () => {
      //arrange
      const imgEl: HTMLImageElement = d.query(By.css("#recipe-splash")).nativeElement;

      //assert
      expect(imgEl.src).toBe(component.recipe.PhotoUrl);
      expect(imgEl.alt).toBe(component.recipe.Title);
      expect(imgEl.title).toBe(component.recipe.Title);
    });

    it("should not display the photo if the PhotoUrl is blank", () => {
      //arrange
      component.recipe.PhotoUrl = "";
      fixture.detectChanges();
      d = fixture.debugElement;

      const imgEl: DebugElement = d.query(By.css("#recipe-splash"));

      //assert
      expect(imgEl).toBeNull();
    })
  })

});
