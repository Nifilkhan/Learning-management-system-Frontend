import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureComponentComponent } from './lecture-component.component';

describe('LectureComponentComponent', () => {
  let component: LectureComponentComponent;
  let fixture: ComponentFixture<LectureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LectureComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
