import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
    title: 'Students IA — Marketplace d\'experts IA certifiés',
  },
  {
    path: 'experts',
    loadComponent: () => import('./pages/experts/experts').then((m) => m.Experts),
    title: 'Experts IA — Students IA',
  },
  {
    path: 'comment-ca-marche',
    loadComponent: () => import('./pages/how-it-works/how-it-works').then((m) => m.HowItWorks),
    title: 'Comment ça marche — Students IA',
  },
  {
    path: 'academie',
    loadComponent: () => import('./pages/academy-page/academy-page').then((m) => m.AcademyPage),
    title: 'Académie IA — Students IA',
  },
  {
    path: 'tarifs',
    loadComponent: () => import('./pages/pricing/pricing').then((m) => m.Pricing),
    title: 'Tarifs — Students IA',
  },
  { path: '**', redirectTo: '' },
];
