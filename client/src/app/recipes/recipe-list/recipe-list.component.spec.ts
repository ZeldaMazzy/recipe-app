import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../recipe.service';
import { of } from 'rxjs';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let service: RecipeService

  beforeEach(async () => {
    service = jasmine.createSpyObj("RecipeService", {
      getRecipes: of()
    })
    await TestBed.configureTestingModule({
      declarations: [ RecipeListComponent ],
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
});
