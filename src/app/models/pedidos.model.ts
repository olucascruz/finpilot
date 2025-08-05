export interface Pedido {
  codigo: number;
  data: string;
  valor: number;
  metodo: string;
  status: 'Pendente' | 'Pago' | 'Cancelado';
}
