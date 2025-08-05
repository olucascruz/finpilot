import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContasBancarias } from './contas-bancarias';

describe('ContasBancarias', () => {
  let component: ContasBancarias;
  let fixture: ComponentFixture<ContasBancarias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContasBancarias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContasBancarias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
