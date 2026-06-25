import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },

  // Authentification (hors shell)
  { path: 'login', loadComponent: () => import('./features/auth/login').then((m) => m.LoginComponent), title: 'Connexion — IApreneur' },
  { path: 'register', loadComponent: () => import('./features/auth/register').then((m) => m.RegisterComponent), title: 'Inscription — IApreneur' },

  // Application (shell connecté)
  {
    path: 'app',
    loadComponent: () => import('./layout/shell').then((m) => m.ShellComponent),
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.DashboardComponent), title: 'Tableau de bord — IApreneur' },
      { path: 'experts', loadComponent: () => import('./features/experts/experts').then((m) => m.ExpertsComponent), title: 'Annuaire — IApreneur' },
      { path: 'experts/:id', loadComponent: () => import('./features/experts/expert-detail').then((m) => m.ExpertDetailComponent), title: 'Profil expert — IApreneur' },
      { path: 'missions/new', loadComponent: () => import('./features/missions/mission-create').then((m) => m.MissionCreateComponent), title: 'Nouvelle mission — IApreneur' },
      { path: 'missions/:id', loadComponent: () => import('./features/missions/mission-detail').then((m) => m.MissionDetailComponent), title: 'Détail mission — IApreneur' },
      { path: 'messages', loadComponent: () => import('./features/messaging/messaging').then((m) => m.MessagingComponent), title: 'Messagerie — IApreneur' },
      { path: 'profile', loadComponent: () => import('./features/profile/profile').then((m) => m.ProfileComponent), title: 'Mon profil — IApreneur' },
      { path: 'admin/validation', loadComponent: () => import('./features/admin/validation').then((m) => m.AdminValidationComponent), title: 'Validation — IApreneur' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'app/dashboard' },
];
