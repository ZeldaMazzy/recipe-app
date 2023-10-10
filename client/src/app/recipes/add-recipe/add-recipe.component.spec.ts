import { FormBuilder } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeComponent } from './add-recipe.component';

describe('AddRecipeComponent', () => {
  let component: AddRecipeComponent;

  describe("Isolated Tests", () => {
    beforeEach(() => {
      component = new AddRecipeComponent(new FormBuilder());
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
