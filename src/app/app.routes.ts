import { Routes } from '@angular/router';
import { authGuard } from './auth/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage),canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
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
  {
    path: 'profile',
    loadComponent: () => import('./auth/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'gender',
    loadComponent: () => import('./auth/gender/gender.page').then( m => m.GenderPage)
  },
  {
    path: 'interest',
    loadComponent: () => import('./auth/interest/interest.page').then( m => m.InterestPage)
  },
  {
    path: 'password',
    loadComponent: () => import('./auth/password/password.page').then( m => m.PasswordPage)
  },
  
  {
    path: 'loader',
    loadComponent: () => import('./common/pages/loader/loader.page').then( m => m.LoaderPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard/dashboard.page').then( m => m.DashboardPage)
  },

];
