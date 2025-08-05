import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceitasDespesas } from './receitas-despesas';

describe('ReceitasDespesasComponent', () => {
  let component: ReceitasDespesas;
  let fixture: ComponentFixture<ReceitasDespesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitasDespesas]
    }).compileComponents();

    fixture = TestBed.createComponent(ReceitasDespesas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve calcular corretamente receitas, despesas e saldo', () => {
    expect(component.receitas).toBe(40400);
    expect(component.despesas).toBe(6250);
    expect(component.saldo).toBe(34150);
  });

  it('deve exibir 5 lançamentos', () => {
    expect(component.data.length).toBe(5);
  });
});
