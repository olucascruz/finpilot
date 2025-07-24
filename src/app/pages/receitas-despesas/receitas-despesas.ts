import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-receitas-despesas',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    Navbar
  ],
  templateUrl: './receitas-despesas.html',
  styleUrls: ['./receitas-despesas.scss']
})
export class ReceitasDespesas {
  filtro = {
    tipo: 'todos',
    periodo: '30',
    categoria: 'todas'
  };

  lancamentos = [
    { data: '06/07/2025', descricao: 'Pagamento Fornecedor', valor: 250, status: 'pendente' },
    { data: '06/07/2025', descricao: 'Venda online', valor: 1000, status: 'pendente' },
    { data: '06/07/2025', descricao: 'Assinatura SaaS', valor: 5000, status: 'cancelado' },
    { data: '06/07/2025', descricao: 'Salário', valor: 40000, status: 'pago' },
    { data: '06/07/2025', descricao: 'Consultoria', valor: 400, status: 'aguardando' }
  ];

  get receitas() {
    return this.lancamentos.filter(l => l.status === 'pago').reduce((acc, l) => acc + l.valor, 0);
  }

  get despesas() {
    return this.lancamentos.filter(l => l.status === 'pendente' || l.status === 'cancelado').reduce((acc, l) => acc + l.valor, 0);
  }

  get saldo() {
    return this.receitas - this.despesas;
  }
}
