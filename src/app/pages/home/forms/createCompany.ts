export const createCompanyForm = {
    title: 'Cadastrar Empresa',
    fields: [
      { nome: 'nomeDaEmpresa', label: 'Nome da empresa' },
      { nome: 'areaDeAtuacao', label: 'Área de atuação' },
      {nome:'cidade', label: 'Cidade'},
      {nome:'estado', label: 'Estado'},
      {nome:'cnpj', label: 'CNPJ'},
    ],
    onSubmit: (data: any) => {
      console.log('Form enviado', data);
    },
};
