import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDescriptionComponent } from './exercise-description.component';

describe('ExerciseDescriptionComponent', () => {
  let component: ExerciseDescriptionComponent;
  let fixture: ComponentFixture<ExerciseDescriptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ExerciseDescriptionComponent],
    });
    fixture = TestBed.createComponent(ExerciseDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
