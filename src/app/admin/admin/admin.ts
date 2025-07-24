import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TableRoles } from '../table-roles/table-roles';
import { UsersRequest } from '../users-request/users-request';
import { EmployeeList } from '../employee-list/employee-list';
import { Navbar } from '../../pages/navbar/navbar';
@Component({
  selector: 'app-admin',
  imports: [MatButtonModule, CommonModule, TableRoles, UsersRequest, EmployeeList, Navbar],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {
  botaoAtivo = 'cargos';
  activeFunction(event: Event){
    console.log(event.currentTarget);
    const id = (event.currentTarget as HTMLElement).id;
    this.botaoAtivo = id;
    console.log(`Botão ativo: ${this.botaoAtivo}`);
  }
}
