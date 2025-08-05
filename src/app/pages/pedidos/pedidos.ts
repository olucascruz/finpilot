import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../models/pedidos.model';
import { PedidosService } from '../../service/pedidos.service';
import { ReceitaDespesaService } from '../../service/receita-despesa.service';
import { CommonModule, NgIf, NgFor, NgClass, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CriarPedido } from '../criar-pedido/criar-pedido';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditarPedido } from './editar-pedido/editar-pedido';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NgIf,
    NgFor,
    NgClass,
    DecimalPipe,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    CriarPedido,
    MatDialogModule
  ]
})
export class Pedidos implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFiltrados: Pedido[] = [];
  pedidoSelecionado: boolean[] = [];
  selecionarTodos = false;
  dropdownAberto = false;
  ordemCrescente = true;
  selecionarTodasDatas = false;
  mostrarFormulario = false;

  filtros = {
    codigo: '',
    datasSelecionadas: [] as string[],
    valor: null,
    metodo: '',
    status: ''
  };

  constructor(
    private pedidosService: PedidosService,
    private receitaDespesaService: ReceitaDespesaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pedidosService.listarPedidos().subscribe((dados) => {
      this.pedidos = dados;
      this.aplicarFiltro();
    });
  }

  aplicarFiltro(): void {
    this.pedidosFiltrados = this.pedidos.filter(p =>
      (!this.filtros.codigo || p.codigo.toString().includes(this.filtros.codigo)) &&
      (this.filtros.datasSelecionadas.length === 0 || this.filtros.datasSelecionadas.includes(p.data)) &&
      (!this.filtros.valor || p.valor >= this.filtros.valor) &&
      (!this.filtros.metodo || p.metodo === this.filtros.metodo) &&
      (!this.filtros.status || p.status === this.filtros.status)
    );
  }

  abrirFormularioPedido() {
    this.mostrarFormulario = true;
  }

  fecharFormularioPedido() {
    this.mostrarFormulario = false;
  }

  onPedidoCriado(novoPedido: Pedido) {
    const ultimoCodigo = this.pedidos.length > 0
      ? Math.max(...this.pedidos.map(p => p.codigo))
      : 0;

    novoPedido.codigo = ultimoCodigo + 1;
    this.pedidos.push(novoPedido);
    this.aplicarFiltro();
  }

  editarPedido(pedido: Pedido) {
    const dialogRef = this.dialog.open(EditarPedido, {
      width: '400px',
      data: pedido
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        pedido.valor = result.valor;
        pedido.metodo = result.metodo;

        const statusAlterado = pedido.status !== result.status;
        pedido.status = result.status;

        if (statusAlterado && result.status === 'Pago') {
          const jaRegistrado = this.receitaDespesaService.verificarSeReceitaExiste(pedido.codigo);
          if (!jaRegistrado) {
            this.receitaDespesaService.criarReceita({
              tipo: 'Receita',
              categoria: 'Venda',
              descricao: `Pedido #${pedido.codigo}`,
              valor: pedido.valor,
              data: pedido.data,
              status: 'Confirmado'
            });
          }
        }

        this.aplicarFiltro();
      }
    });
  }

  excluirPedido(pedido: Pedido) {
    this.pedidos = this.pedidos.filter(p => p !== pedido);
    this.aplicarFiltro();
  }

  get datasOrdenadas(): string[] {
    const datas = [...new Set(this.pedidos.map(p => p.data))];
    return datas.sort((a, b) => this.ordemCrescente ? a.localeCompare(b) : b.localeCompare(a));
  }

  get metodosUnicos(): string[] {
    return [...new Set(this.pedidos.map(p => p.metodo))];
  }

  formatarData(data: string): string {
    if (data.includes('/')) return data;
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  toggleDropdown(): void {
    this.dropdownAberto = !this.dropdownAberto;
  }

  ordenarDatas(crescente: boolean) {
    this.ordemCrescente = crescente;
  }

  alternarTodasDatas(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.filtros.datasSelecionadas = checked ? [...this.datasOrdenadas] : [];
    this.aplicarFiltro();
  }

  todasDatasSelecionadas(): boolean {
    return this.filtros.datasSelecionadas.length === this.datasOrdenadas.length;
  }

  onCheckboxChange(data: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.filtros.datasSelecionadas.push(data);
    } else {
      this.filtros.datasSelecionadas = this.filtros.datasSelecionadas.filter(d => d !== data);
    }
    this.aplicarFiltro();
  }

  selecionarTodosChange() {
    this.pedidoSelecionado = this.pedidosFiltrados.map(() => this.selecionarTodos);
  }

  atualizarSelecionarTodos() {
    this.selecionarTodos = this.pedidoSelecionado.every(v => v);
  }

  exportarParaExcel() { }
}
