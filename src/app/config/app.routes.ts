import { Routes } from '@angular/router';
// Rotas sem layout
import { Login } from '../user/login/login';
import { Register } from '../user/register/register';
import { LadingPage } from '../pages/lading-page/lading-page';
import { Profile } from '../user/profile/profile';
// Layout
import { Layout } from '../pages/layout/layout';
// Telas com layout
import { Dashboard } from '../pages/dashboard/dashboard';
import { Pedidos } from '../pages/pedidos/pedidos';
import { ReceitasDespesas } from '../pages/receitas-despesas/receitas-despesas';
import { Admin } from '../admin/admin/admin';
import { ContasBancarias } from '../pages/contas-bancarias/contas-bancarias';
import { MetasVsRealizado } from '../pages/metas/metas';
import { CriarPedido } from '../pages/criar-pedido/criar-pedido';
import { NotFound } from '../pages/notfound/notfound';

export const routes: Routes = [
  // ROTAS SEM LAYOUT
  { path: '', component: LadingPage },
  { path: 'LandingPage', component: LadingPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile },
  { path: 'admin', component: Admin },

  // ROTAS COM LAYOUT COMPARTILHADO
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'pedidos', component: Pedidos },
      { path: 'criarpedido', component: CriarPedido },
      { path: 'receita', component: ReceitasDespesas },
      { path: 'contas', component: ContasBancarias},
      { path: 'metas', component: MetasVsRealizado}
    ]
  },

  // Wildcard para rota não encontrada
  { path: '**', component: NotFound }, // Redireciona para a página de carregamento
];
