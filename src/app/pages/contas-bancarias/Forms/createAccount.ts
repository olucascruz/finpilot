export const createAccountForm = {
    title: 'Criar Conta Bancária',
    fields: [
      { nome: 'banco', label: 'Banco' },
      { nome: 'agencia', label: 'Agência' },
      { nome: 'numeroDaConta', label: 'Número da Conta' },
      { nome: 'titular', label: 'Titular' }
    ],
    onSubmit: (data: any) => {
      console.log('Formulário enviado', data);
    },


}
