export const enterCompanyForm = {
    title: 'Solicite acceso á empresa',
    fields: [
      { nome: 'codemp', label: 'Código da empresa' },
    ],
    onSubmit: (data: any) => {
      console.log('Form enviado', data);
    },
};
