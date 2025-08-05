import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { combineLatest } from 'rxjs';
import { PedidosService } from '../../service/pedidos.service';
import { ReceitaDespesa, ReceitaDespesaService } from '../../service/receita-despesa.service';

interface ReceitaDespesaExtendida extends ReceitaDespesa {
  origemPedido?: boolean;
}

@Component({
  selector: 'app-receitas-despesas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule
  ],
  templateUrl: './receitas-despesas.html',
  styleUrls: ['./receitas-despesas.scss']
})
export class ReceitasDespesas implements OnInit {
  filtro = {
    tipo: 'todos',
    periodo: 'mes',
    categoria: 'todas'
  };

  data: ReceitaDespesaExtendida[] = [];
  displayedColumns = ['descricao', 'tipo', 'valor', 'status', 'acoes'];

  constructor(
    private receitaDespesaService: ReceitaDespesaService,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    this.carregarLancamentos();
  }

  carregarLancamentos(): void {
    combineLatest([
      this.receitaDespesaService.listarLancamentos(),
      this.pedidosService.listarPedidos()
    ]).subscribe(([lancamentos, pedidos]) => {
      const receitasPedidos: ReceitaDespesaExtendida[] = pedidos
        .filter(p => p.status === 'Pago')
        .map((p, i) => ({
          id: 1000 + i,
          tipo: 'Receita',
          categoria: 'Venda',
          descricao: `Pedido #${p.codigo}`,
          valor: p.valor,
          data: p.data,
          status: 'Confirmado',
          origemPedido: true
        }));

      this.data = [
        ...lancamentos.map(l => ({ ...l, origemPedido: false })),
        ...receitasPedidos
      ];
    });
  }

  get receitas(): number {
    return this.data
      .filter(d => d.tipo === 'Receita' && d.status === 'Confirmado')
      .reduce((acc, d) => acc + d.valor, 0);
  }

  get despesas(): number {
    return this.data
      .filter(d => d.tipo === 'Despesa' && d.status === 'Confirmado')
      .reduce((acc, d) => acc + d.valor, 0);
  }

  get saldo(): number {
    return this.receitas - this.despesas;
  }

  exportar(): void {
    console.log('Exportar...');
  }

  novoLancamento(): void {
    console.log('Novo lançamento...');
    // abrir formulário de criação manual
  }

  editar(item: ReceitaDespesaExtendida): void {
    if (item.origemPedido) return;
    console.log('Editar:', item);
  }
}
