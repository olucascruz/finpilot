import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompany } from './create-company';

describe('CreateCompany', () => {
  let component: CreateCompany;
  let fixture: ComponentFixture<CreateCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCompany);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
