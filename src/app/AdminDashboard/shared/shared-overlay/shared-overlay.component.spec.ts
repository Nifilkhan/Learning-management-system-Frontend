import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOverlayComponent } from './shared-overlay.component';

describe('SharedOverlayComponent', () => {
  let component: SharedOverlayComponent;
  let fixture: ComponentFixture<SharedOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
