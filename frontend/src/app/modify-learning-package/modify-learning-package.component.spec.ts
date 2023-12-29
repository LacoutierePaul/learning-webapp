import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyLearningPackageComponent } from './modify-learning-package.component';

describe('ModifyLearningPackageComponent', () => {
  let component: ModifyLearningPackageComponent;
  let fixture: ComponentFixture<ModifyLearningPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyLearningPackageComponent]
    });
    fixture = TestBed.createComponent(ModifyLearningPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
