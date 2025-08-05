import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericForm } from '../../components/generic-form/generic-form';
import { createAccountForm } from './Forms/createAccount';
@Component({
  selector: 'app-contas-bancarias',
  standalone: true,
  imports: [CommonModule, GenericForm],
  templateUrl: './contas-bancarias.html',
  styleUrls: ['./contas-bancarias.scss']
})
export class ContasBancarias {
  contas = [
    { nome: 'Banco do Brasil', tipo: 'Corrente' },
    { nome: 'Caixa Econômica', tipo: 'Poupança' },
    { nome: 'Nubank', tipo: 'Conta Digital' }
  ];

  createAccountForm = createAccountForm
  exibirCreateAccountForm  = false;


  abrirFormularioCreate() {
    this.exibirCreateAccountForm = true;
  }
  fecharFormularioCreate() {
    this.exibirCreateAccountForm = false;
  }

}
