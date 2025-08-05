import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPedido } from './editar-pedido';

describe('EditarPedido', () => {
  let component: EditarPedido;
  let fixture: ComponentFixture<EditarPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
