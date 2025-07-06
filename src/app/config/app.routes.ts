import { Routes } from '@angular/router';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { LadingPage } from '../pages/lading-page/lading-page';

export const routes: Routes = [
    {path:'', component: LadingPage},
    {path:'login', component: Login},
    {path:'register', component: Register}
];
