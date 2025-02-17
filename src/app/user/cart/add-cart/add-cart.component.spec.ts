import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartComponent } from './add-cart.component';

describe('AddCartComponent', () => {
  let component: AddCartComponent;
  let fixture: ComponentFixture<AddCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
