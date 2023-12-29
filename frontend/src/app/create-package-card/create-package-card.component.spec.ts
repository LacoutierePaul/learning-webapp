import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackageCardComponent } from './create-package-card.component';

describe('CreatePackageCardComponent', () => {
  let component: CreatePackageCardComponent;
  let fixture: ComponentFixture<CreatePackageCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePackageCardComponent]
    });
    fixture = TestBed.createComponent(CreatePackageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
