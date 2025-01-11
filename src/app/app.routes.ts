import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'signup',
    loadComponent: () => import('./auth/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'number',
    loadComponent: () => import('./auth/number/number.page').then( m => m.NumberPage)
  },
  {
    path: 'otp-verify',
    loadComponent: () => import('./auth/otp-verify/otp-verify.page').then( m => m.OtpVerifyPage)
  },

];
