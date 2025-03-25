import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDialogeComponent } from './cart-dialoge.component';

describe('CartDialogeComponent', () => {
  let component: CartDialogeComponent;
  let fixture: ComponentFixture<CartDialogeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDialogeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
