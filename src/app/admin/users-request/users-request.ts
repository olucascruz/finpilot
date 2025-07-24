import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-request',
  imports: [CommonModule, FormsModule],
  templateUrl: './users-request.html',
  styleUrl: './users-request.scss'
})
export class UsersRequest {

    solicitacoes = [
    { nome: 'User 1', email: 'email@gmail.com', data: '05/11/2025', selecionado: false },
    { nome: 'User 2', email: 'email@gmail.com', data: '05/11/2025', selecionado: false },
    { nome: 'User 3', email: 'email@gmail.com', data: '05/11/2025', selecionado: false },
  ];

  recusar() {
    this.solicitacoes = this.solicitacoes.filter(s => !s.selecionado);
  }

  aceitar() {
    const aceitos = this.solicitacoes.filter(s => s.selecionado);
    console.log('Aceitos:', aceitos);
    this.solicitacoes = this.solicitacoes.filter(s => !s.selecionado);
  }

}
