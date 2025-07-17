import { Routes } from '@angular/router';
import { Login } from '../user/login/login';
import { Register } from '../user/register/register';
import { LadingPage } from '../pages/lading-page/lading-page';
import { Profile } from '../user/profile/profile';

export const routes: Routes = [
    {path:'', component: LadingPage},
    {path:'login', component: Login},
    {path:'register', component: Register},
    {path:'profile', component: Profile}
];
