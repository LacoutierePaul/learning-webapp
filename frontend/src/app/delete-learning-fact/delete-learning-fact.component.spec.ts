import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLearningFactComponent } from './delete-learning-fact.component';

describe('DeleteLearningFactComponent', () => {
  let component: DeleteLearningFactComponent;
  let fixture: ComponentFixture<DeleteLearningFactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteLearningFactComponent]
    });
    fixture = TestBed.createComponent(DeleteLearningFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
