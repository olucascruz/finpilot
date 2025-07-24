import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-criar-pedido',
  standalone: true,
  templateUrl: './criar-pedido.html',
  styleUrls: ['./criar-pedido.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class CriarPedido {
  pedidoForm: FormGroup;
  modoEdicao: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CriarPedido>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pedidoForm = this.fb.group({
      cliente: [''],
      produto: [''],
      valor: [''],
      formaPagamento: [''],
      observacao: ['']
    });

    if (data) {
      this.modoEdicao = true;
      this.pedidoForm.patchValue(data);
    }
  }

  onSubmit() {
    if (this.pedidoForm.valid) {
      this.dialogRef.close(this.pedidoForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
