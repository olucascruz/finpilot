import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create-company',
  imports: [FormsModule],
  templateUrl: './create-company.html',
  styleUrl: './create-company.scss'
})
export class CreateCompany {
  nome = '';
  area = '';
  state = '';
  city='';
  cnpj = '';

onSubmit() {
  console.log('Nome:', this.nome);
}
}
