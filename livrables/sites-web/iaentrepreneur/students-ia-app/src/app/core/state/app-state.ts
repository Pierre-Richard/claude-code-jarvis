import { Injectable, computed, signal } from '@angular/core';
import { Role } from '../../models/data';

/**
 * État applicatif global (prototype). Gère le rôle courant (entreprise/expert/admin)
 * et l'identité mockée affichée dans le shell. Sera alimenté par l'auth Supabase ensuite.
 */
@Injectable({ providedIn: 'root' })
export class AppState {
  readonly role = signal<Role>('company');

  readonly userName = computed(() => {
    switch (this.role()) {
      case 'expert': return 'Dr. Amine Khelifi';
      case 'admin': return 'Admin IApreneur';
      default: return 'Acme Retail';
    }
  });

  readonly userInitials = computed(() => {
    switch (this.role()) {
      case 'expert': return 'AK';
      case 'admin': return 'AD';
      default: return 'AR';
    }
  });

  readonly roleLabel = computed(() => {
    switch (this.role()) {
      case 'expert': return 'Expert IA';
      case 'admin': return 'Administrateur';
      default: return 'Entreprise';
    }
  });

  setRole(role: Role): void {
    this.role.set(role);
  }
}
