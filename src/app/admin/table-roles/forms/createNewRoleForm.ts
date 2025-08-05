export const createNewRoleForm = {
    title: 'Cadastrar Empresa',
    fields: [
      { nome: 'role', label: 'Nome do cargo' }
    ],
    onSubmit: (data: any) => {
      console.log('Form enviado', data);
    },
};
