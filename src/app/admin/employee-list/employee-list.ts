import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss'
})
export class EmployeeList {
   usuarios = [
    { nome: 'User 1', email: 'email@gmail.com', cargo: 'analista' },
    { nome: 'User 2', email: 'email2@gmail.com', cargo: 'dev' },
    { nome: 'User 3', email: 'email3@gmail.com', cargo: 'designer' },
  ];

  selecionarUsuario(user: any) {
    console.log('Usuário clicado:', user);
    // aqui você pode navegar pra uma tela de detalhes ou abrir modal
  }
}
