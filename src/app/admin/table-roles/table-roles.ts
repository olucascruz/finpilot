import { Component } from '@angular/core';
import { GenericForm } from '../../components/generic-form/generic-form';
import { createNewRoleForm } from './forms/createNewRoleForm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-roles',
  imports: [GenericForm, CommonModule],
  templateUrl: './table-roles.html',
  styleUrl: './table-roles.scss'
})


export class TableRoles {
    createNewRoleForm = createNewRoleForm;
    exibirCreateNewRoleForm  = false;
  
  
    abrirFormularioCreate() {
      this.exibirCreateNewRoleForm = true;
    }
    fecharFormularioCreate() {
      this.exibirCreateNewRoleForm = false;
    }
   
}
