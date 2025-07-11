import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadingPage } from './lading-page';

describe('LadingPage', () => {
  let component: LadingPage;
  let fixture: ComponentFixture<LadingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadingPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
