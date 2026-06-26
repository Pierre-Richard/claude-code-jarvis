import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { IconComponent } from '../ui/icon';
import { AppState } from '../core/state/app-state';
import { AuthService } from '../core/auth/auth.service';
import { Role } from '../models/data';

interface NavItem { label: string; icon: string; route: string; badge?: string; roles: Role[]; }

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './shell.html',
})
export class ShellComponent {
  protected readonly state = inject(AppState);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly role = this.state.role;
  protected readonly menuOpen = signal(false);
  protected readonly sidebarOpen = signal(false);
  private readonly url = signal(this.router.url);

  private readonly nav: NavItem[] = [
    { label: 'Tableau de bord', icon: 'grid', route: '/app/dashboard', roles: ['company', 'expert', 'admin'] },
    { label: 'Annuaire experts', icon: 'users', route: '/app/experts', roles: ['company', 'expert', 'admin'] },
    { label: 'Validation experts', icon: 'badge', route: '/app/admin/validation', roles: ['admin'] },
    { label: 'Messagerie', icon: 'chat', route: '/app/messages', badge: '2', roles: ['company', 'expert', 'admin'] },
    { label: 'Mon profil', icon: 'user', route: '/app/profile', roles: ['company', 'expert'] },
  ];

  protected readonly visibleNav = computed(() => this.nav.filter((n) => n.roles.includes(this.role())));

  protected readonly page = computed(() => {
    const u = this.url();
    const r = this.role();
    if (u.includes('/app/experts/')) return { title: 'Profil expert', subtitle: 'Détail et prise de contact', primaryLabel: '' };
    if (u.includes('/app/experts')) return { title: 'Annuaire des experts', subtitle: 'Trouvez l’expert IA certifié adapté à votre besoin', primaryLabel: r === 'company' ? 'Lancer une mission' : '' };
    if (u.includes('/app/missions/new')) return { title: 'Nouvelle mission', subtitle: 'Décrivez votre besoin', primaryLabel: '' };
    if (u.includes('/app/missions/')) return { title: 'Détail de la mission', subtitle: 'Suivi et statut', primaryLabel: '' };
    if (u.includes('/app/messages')) return { title: 'Messagerie', subtitle: 'Vos échanges', primaryLabel: '' };
    if (u.includes('/app/profile')) return { title: 'Mon profil', subtitle: 'Gérez vos informations', primaryLabel: '' };
    if (u.includes('/app/admin/validation')) return { title: 'Validation des experts', subtitle: 'Certifiez les nouveaux profils', primaryLabel: '' };
    const title = r === 'expert' ? 'Tableau de bord expert' : r === 'admin' ? 'Console d’administration' : 'Tableau de bord';
    const subtitle = r === 'expert' ? 'Vos propositions et missions' : r === 'admin' ? 'Vue d’ensemble de la plateforme' : 'Vue d’ensemble de vos missions';
    return { title, subtitle, primaryLabel: r === 'company' ? 'Lancer une mission' : '' };
  });

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      this.url.set((e as NavigationEnd).urlAfterRedirects);
      this.menuOpen.set(false);
      this.sidebarOpen.set(false);
    });
  }

  protected setRole(role: Role): void {
    this.state.setRole(role);
  }

  protected goPrimary(): void {
    this.router.navigateByUrl('/app/missions/new');
  }

  protected async logout(): Promise<void> {
    this.menuOpen.set(false);
    await this.auth.signOut();
    await this.router.navigateByUrl('/login');
  }
}
