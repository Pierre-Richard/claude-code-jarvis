import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

/**
 * Point d'accès unique au client Supabase (Auth, Storage, Realtime, requêtes Postgres via RLS).
 * Injecté dans les services qui parlent directement à Supabase (auth, profils, experts, messagerie).
 * La logique métier (missions, matching, paiement) passe, elle, par l'API .NET.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey,
  );
}
