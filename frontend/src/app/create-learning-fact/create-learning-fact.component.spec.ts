import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLearningFactComponent } from './create-learning-fact.component';

describe('CreateLearningFactComponent', () => {
  let component: CreateLearningFactComponent;
  let fixture: ComponentFixture<CreateLearningFactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLearningFactComponent]
    });
    fixture = TestBed.createComponent(CreateLearningFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
