import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-criar-pedido',
  standalone: true,
  templateUrl: './criar-pedido.html',
  styleUrls: ['./criar-pedido.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class CriarPedido {
  @Output() fechar = new EventEmitter<void>();
  @Output() pedidoCriado = new EventEmitter<any>();

  pedidoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.pedidoForm = this.fb.group({
      valor: [''],
      metodo: ['']
    });
  }

  onCancel() {
    this.fechar.emit();
  }

  onSubmit() {
    if (this.pedidoForm.valid) {
      const novoPedido = {
        codigo: 0, // será definido em pedidos.ts
        data: new Date().toISOString().split('T')[0],
        valor: parseFloat(this.pedidoForm.value.valor),
        metodo: this.pedidoForm.value.metodo,
        status: 'Pendente'
      };

      this.pedidoCriado.emit(novoPedido);
      this.fechar.emit();
    }
  }
}
