import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPedido } from './criar-pedido';

describe('CriarPedido', () => {
  let component: CriarPedido;
  let fixture: ComponentFixture<CriarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
