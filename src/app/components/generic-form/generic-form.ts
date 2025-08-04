import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa o módulo necessário
import { CommonModule } from '@angular/common'; // também é necessário em standalone

@Component({
  selector: 'app-generic-form',
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './generic-form.html',
  styleUrl: './generic-form.scss'
})


export class GenericForm {
  @Input() set campos(value: Campo[]) {
    if (value) {
      this._campos = value;
      this.criarFormulario(value);
    }
  }

  @Input() aoEnviar?: (valores: any) => void;
  @Input() title: string = 'Formulário';

  formulario!: FormGroup;
  private _campos: Campo[] = [];

  constructor(private fb: FormBuilder) {}

  private criarFormulario(campos: Campo[]): void {
    const grupo: Record<string, any> = {};

    for (const campo of campos) {
      grupo[campo.nome] = [false, campo.requerido ? Validators.required : []];
    }

    this.formulario = this.fb.group(grupo);
  }

  submit(): void {
     if (this.formulario.valid && this.aoEnviar) {
     this.aoEnviar(this.formulario.value);
    }
  }
}
export interface Campo {
  nome: string;
  requerido?: boolean;
  tipo?: string; // opcional, caso você queira renderizar tipos como input, checkbox etc.
  label?: string;
  valorInicial?: any;
}