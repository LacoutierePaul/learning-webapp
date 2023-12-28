import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLearningPackageComponent } from './delete-learning-package.component';

describe('DeleteLearningPackageComponent', () => {
  let component: DeleteLearningPackageComponent;
  let fixture: ComponentFixture<DeleteLearningPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteLearningPackageComponent]
    });
    fixture = TestBed.createComponent(DeleteLearningPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
