import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyLearningFactComponent } from './modify-learning-fact.component';

describe('ModifyLearningFactComponent', () => {
  let component: ModifyLearningFactComponent;
  let fixture: ComponentFixture<ModifyLearningFactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyLearningFactComponent]
    });
    fixture = TestBed.createComponent(ModifyLearningFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
