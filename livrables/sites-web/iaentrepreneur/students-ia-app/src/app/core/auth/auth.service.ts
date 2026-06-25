import { Injectable, computed, inject, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.client';
import { AppState } from '../state/app-state';
import { Role } from '../../models/data';

/**
 * Authentification via Supabase : inscription (avec rôle + nom), connexion, déconnexion,
 * suivi de la session et chargement du profil pour alimenter l'état applicatif.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly state = inject(AppState);

  readonly session = signal<Session | null>(null);
  readonly isAuthenticated = computed(() => this.session() !== null);

  /** Restaure la session au démarrage et s'abonne aux changements (appelé par provideAppInitializer). */
  async init(): Promise<void> {
    const { data } = await this.supabase.auth.getSession();
    await this.applySession(data.session);
    this.supabase.auth.onAuthStateChange((_event, session) => {
      void this.applySession(session);
    });
  }

  async signUp(email: string, password: string, fullName: string, role: Role): Promise<void> {
    const dbRole = role === 'expert' ? 'Expert' : 'Entreprise';
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role: dbRole } },
    });
    if (error) throw error;
    if (data.session) await this.applySession(data.session);
  }

  async signIn(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await this.applySession(data.session);
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();
    this.session.set(null);
    this.state.reset();
  }

  get accessToken(): string | null {
    return this.session()?.access_token ?? null;
  }

  private async applySession(session: Session | null): Promise<void> {
    this.session.set(session);
    if (session) {
      await this.loadProfile(session.user.id);
    } else {
      this.state.reset();
    }
  }

  private async loadProfile(userId: string): Promise<void> {
    const { data } = await this.supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .single();
    if (data) this.state.setProfile(data.role, data.full_name);
  }
}
