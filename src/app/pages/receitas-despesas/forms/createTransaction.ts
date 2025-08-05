export const createTransactionForm = {
  title: 'Criar Transação',
  fields: [
      {nome: 'tipo', label: 'Tipo' },
      {nome: 'categoria', label: 'Categoria' },
      {nome:'descricao', label: 'Descrição'},
      {nome:'valor', label: 'Valor'},
      {nome:'data', label: 'Data', tipo:'date'},
      {nome:'status', label: 'Status'},

    ],
    onSubmit: (data: any) => {
      console.log('Form enviado', data);
    },
}
