import { Injectable, computed, signal } from '@angular/core';
import { Role } from '../../models/data';

/** Convertit le rôle stocké en base (enum .NET) vers le rôle applicatif front. */
function mapDbRole(dbRole: string | null | undefined): Role {
  switch (dbRole) {
    case 'Expert': return 'expert';
    case 'Admin': return 'admin';
    default: return 'company';
  }
}

/**
 * État applicatif : rôle courant et identité, alimentés par le profil Supabase après connexion.
 * Le switcher de rôle du shell reste disponible comme aide de prototypage.
 */
@Injectable({ providedIn: 'root' })
export class AppState {
  readonly role = signal<Role>('company');
  readonly fullName = signal('');

  readonly userName = computed(() => this.fullName() || this.roleLabel());

  readonly userInitials = computed(() => {
    const name = this.fullName().trim();
    if (!name) return 'IA';
    const parts = name.replace(/^(Dr\.?|M\.?|Mme)\s+/i, '').split(/\s+/).filter(Boolean);
    return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || 'IA';
  });

  readonly roleLabel = computed(() => {
    switch (this.role()) {
      case 'expert': return 'Expert IA';
      case 'admin': return 'Administrateur';
      default: return 'Entreprise';
    }
  });

  /** Applique le profil chargé depuis Supabase. */
  setProfile(dbRole: string | null | undefined, fullName: string | null | undefined): void {
    this.role.set(mapDbRole(dbRole));
    this.fullName.set(fullName ?? '');
  }

  /** Switcher de prototypage (change seulement la vue). */
  setRole(role: Role): void {
    this.role.set(role);
  }

  reset(): void {
    this.role.set('company');
    this.fullName.set('');
  }
}
