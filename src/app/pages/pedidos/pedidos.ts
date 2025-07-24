import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CriarPedido } from '../criar-pedido/criar-pedido';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    Navbar
  ]
})
export class Pedidos {
  filtroForm: FormGroup;
  selecionadosForm: FormGroup;

  pedidos: any[] = [
    { codigo: 1, data: '06/07/2025', valor: 250.00, metodoPagamento: 'Pix', status: 'Pendente' },
    { codigo: 2, data: '06/07/2025', valor: 1000.00, metodoPagamento: 'Crédito', status: 'Cancelado' },
    { codigo: 3, data: '06/07/2025', valor: 2500.00, metodoPagamento: 'Débito', status: 'Pago' },
    { codigo: 4, data: '06/07/2025', valor: 500.00, metodoPagamento: 'Boleto', status: 'Pago' }
  ];

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.filtroForm = this.fb.group({
      periodo: [''],
      metodoPagamento: [''],
      status: ['']
    });

    this.selecionadosForm = this.fb.group({
      selecionados: this.fb.array(this.pedidos.map(() => this.fb.control(false)))
    });
  }

  get selecionados(): FormArray {
    return this.selecionadosForm.get('selecionados') as FormArray;
  }

  abrirFormularioPedido() {
    this.dialog.open(CriarPedido, {
      width: '500px',
      disableClose: true
    });
  }

  getControle(index: number): FormControl {
    return this.selecionados.at(index) as FormControl;
  }

  editarPedido(pedido: any): void {
    const dialogRef = this.dialog.open(CriarPedido, {
      width: '500px',
      disableClose: true,
      data: pedido
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.pedidos.findIndex(p => p.codigo === pedido.codigo);
        if (index !== -1) {
          this.pedidos[index] = { ...pedido, ...result };
        }
      }
    });
  }

  excluirPedido(pedido: any): void {
    const index = this.pedidos.findIndex(p => p.codigo === pedido.codigo);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      this.selecionados.removeAt(index);
    }
  }

  alternarSelecaoTodos(event: any): void {
    const checked = event.checked;
    this.selecionados.controls.forEach(ctrl => ctrl.setValue(checked));
  }
}
