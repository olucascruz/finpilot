import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manutencao } from './manutencao';

describe('Manutencao', () => {
  let component: Manutencao;
  let fixture: ComponentFixture<Manutencao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manutencao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manutencao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});