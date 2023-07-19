import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipeComponent } from './view-recipe.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeService } from '../recipe.service';
import { of } from 'rxjs';

describe('ViewRecipeComponent', () => {
  let component: ViewRecipeComponent;
  let fixture: ComponentFixture<ViewRecipeComponent>;
  let service: RecipeService;

  beforeEach(async () => {
    service = jasmine.createSpyObj("RecipeService", {
      getRecipeByUrl: of()
    })
    await TestBed.configureTestingModule({
      declarations: [ ViewRecipeComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: RecipeService, useValue: service}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
