import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRecipeContainerComponent } from './single-recipe-container.component';

describe('SingleRecipeContainerComponent', () => {
  let component: SingleRecipeContainerComponent;
  let fixture: ComponentFixture<SingleRecipeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRecipeContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleRecipeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
