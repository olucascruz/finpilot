import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReceitaDespesaService } from './receita-despesa.service';

export interface Pedido {
  codigo: number;
  data: string;
  valor: number;
  metodo: string;
  status: 'Pago' | 'Pendente' | 'Cancelado';
}

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private pedidosMock: Pedido[] = [
    { codigo: 1, data: '2025-07-06', valor: 250, metodo: 'Pix', status: 'Pendente' },
    { codigo: 2, data: '2025-07-03', valor: 1000, metodo: 'Crédito', status: 'Cancelado' },
    { codigo: 3, data: '2025-03-04', valor: 2500, metodo: 'Débito', status: 'Pago' },
    { codigo: 4, data: '2025-06-08', valor: 500, metodo: 'Boleto', status: 'Pago' }
  ];

  private pedidosSubject = new BehaviorSubject<Pedido[]>(this.pedidosMock);

  constructor(private receitaDespesaService: ReceitaDespesaService) {}

  listarPedidos(): Observable<Pedido[]> {
    return this.pedidosSubject.asObservable();
  }

  atualizarStatusPedido(codigo: number, novoStatus: 'Pago' | 'Pendente' | 'Cancelado'): void {
    const pedidosAtualizados = this.pedidosMock.map(p => {
      if (p.codigo === codigo) {
        p.status = novoStatus;

        if (novoStatus === 'Pago' &&
            !this.receitaDespesaService.verificarSeReceitaExiste(p.codigo)) {
          this.receitaDespesaService.criarReceita({
            tipo: 'Receita',
            categoria: 'Venda',
            descricao: `Pedido #${p.codigo}`,
            valor: p.valor,
            data: p.data,
            status: 'Confirmado'
          });
        }
      }
      return p;
    });

    this.pedidosMock = pedidosAtualizados;
    this.pedidosSubject.next([...this.pedidosMock]); // 🔹 dispara atualização
  }
}
