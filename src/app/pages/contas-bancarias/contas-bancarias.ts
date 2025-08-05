import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contas-bancarias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contas-bancarias.html',
  styleUrls: ['./contas-bancarias.scss']
})
export class ContasBancarias {
  contas = [
    { nome: 'Banco do Brasil', tipo: 'Corrente' },
    { nome: 'Caixa Econômica', tipo: 'Poupança' },
    { nome: 'Nubank', tipo: 'Conta Digital' }
  ];
}
