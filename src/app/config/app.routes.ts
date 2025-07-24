import { Routes } from '@angular/router';
import { Login } from '../user/login/login';
import { Register } from '../user/register/register';
import { LadingPage } from '../pages/lading-page/lading-page';
import { Profile } from '../user/profile/profile';
import { Admin } from '../admin/admin/admin';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Pedidos } from '../pages/pedidos/pedidos';
import { Manutencao } from '../pages/manutencao/manutencao';
import { CriarPedido } from '../pages/criar-pedido/criar-pedido';
import { ReceitasDespesas } from '../pages/receitas-despesas/receitas-despesas';

export const routes: Routes = [
    { path:'', component: LadingPage},
    { path:'login', component: Login},
    { path:'register', component: Register},
    { path:'profile', component: Profile},
    { path:'admin', component: Admin},
    { path: 'dashboard', component: Dashboard},
    { path: 'pedidos', component: Pedidos},
    { path: 'manutencao', component: Manutencao},
    { path: 'criarpedido', component: CriarPedido},
    { path: 'receita', component: ReceitasDespesas}
]