import { provideRouter, RouterModule, Routes, withRouterConfig } from '@angular/router';
import { Login } from '../user/login/login';
import { Register } from '../user/register/register';
import { LadingPage } from '../pages/lading-page/lading-page';
import { Profile } from '../user/profile/profile';
import { Admin } from '../admin/admin/admin';
import { Dashboard } from '../pages/dashboard/dashboard';

export const routes: Routes = [
    {path:'', component: LadingPage},
    {path:'login', component: Login},
    {path:'register', component: Register},
    {path:'profile', component: Profile},
    {path:'admin', component: Admin},
    { path: 'dashboard', component: Dashboard }
]

