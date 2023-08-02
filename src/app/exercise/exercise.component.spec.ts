import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseComponent } from './exercise.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ExerciseComponent', () => {
  let component: ExerciseComponent;
  let fixture: ComponentFixture<ExerciseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, ExerciseComponent],
    });
    fixture = TestBed.createComponent(ExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
