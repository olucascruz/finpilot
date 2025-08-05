export const exportTransactionsForm = {
  title: 'Exportar Transações',
  fields: [
      {nome: 'pedidosSelecionados', label: 'Pedidos selecionados' },
      {nome: 'formato', label: 'Formato' },

    ],
    onSubmit: (data: any) => {
      console.log('Form enviado', data);
    },
}
