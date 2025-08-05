import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-metas-dialog',
  standalone: true,
  templateUrl: './metas-dialog.html',
  styleUrls: ['./metas-dialog.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class MetasDialog {
  form: FormGroup;

  categorias: string[] = ['Receita', 'Despesa', 'Lucro'];

  constructor(
    private dialogRef: MatDialogRef<MetasDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      categoria: ['', Validators.required],
      valorMeta: [null, [Validators.required, Validators.min(0)]],
      valorRealizado: [null, [Validators.required, Validators.min(0)]]
    });

    if (data) {
      this.form.patchValue(data);
    }
  }

  salvar(): void {
    if (this.form.valid) {
      const { categoria, valorMeta, valorRealizado } = this.form.value;
      const atingido = (valorRealizado / valorMeta) * 100;

      this.dialogRef.close({
        categoria,
        valorMeta,
        valorRealizado,
        atingido
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
