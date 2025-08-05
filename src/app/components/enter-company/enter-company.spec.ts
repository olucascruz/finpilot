import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterCompany } from './enter-company';

describe('EnterCompany', () => {
  let component: EnterCompany;
  let fixture: ComponentFixture<EnterCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterCompany);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
