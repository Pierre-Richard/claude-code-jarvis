import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.client';
import { Expert } from '../../models/data';

/** Ligne brute renvoyée par Supabase (table experts + profil joint). */
interface ExpertRow {
  id: string;
  headline: string | null;
  bio: string | null;
  expertise: string[] | null;
  sectors: string[] | null;
  languages: string | null;
  experience_years: number | null;
  daily_rate: number | null;
  rating: number | null;
  certified: boolean | null;
  available: boolean | null;
  profiles: { full_name: string | null } | null;
}

const SELECT =
  'id, headline, bio, expertise, sectors, languages, experience_years, daily_rate, rating, certified, available, profiles(full_name)';

function initialsOf(name: string): string {
  const parts = name.replace(/^(Dr\.?|M\.?|Mme)\s+/i, '').split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || 'IA';
}

/** Nombre d'avis pseudo-déterministe pour l'affichage (en attendant une vraie table d'avis). */
function pseudoReviews(id: string): number {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return 12 + (h % 56);
}

function mapExpert(row: ExpertRow): Expert {
  const name = row.profiles?.full_name ?? '';
  const expertise = row.expertise ?? [];
  const sectors = row.sectors ?? [];
  return {
    id: row.id,
    name,
    initials: initialsOf(name),
    role: row.headline ?? '',
    certified: !!row.certified,
    note: Number(row.rating ?? 0),
    reviews: pseudoReviews(row.id),
    years: row.experience_years ?? 0,
    tjm: Number(row.daily_rate ?? 0),
    expertise: expertise[0] ?? '',
    tags: [...expertise, ...sectors].slice(0, 3),
    sectors,
    langs: (row.languages ?? '').split(/[·/,]/).map((s) => s.trim()).filter(Boolean),
    available: row.available ?? true,
    bio: row.bio ?? '',
  };
}

/** Accès aux experts depuis Supabase (lecture publique via RLS). */
@Injectable({ providedIn: 'root' })
export class ExpertService {
  private readonly supabase = inject(SupabaseService).client;

  async list(): Promise<Expert[]> {
    const { data, error } = await this.supabase
      .from('experts')
      .select(SELECT)
      .order('daily_rate', { ascending: false });
    if (error) throw error;
    return (data as unknown as ExpertRow[]).map(mapExpert);
  }

  async getById(id: string): Promise<Expert | null> {
    const { data, error } = await this.supabase.from('experts').select(SELECT).eq('id', id).single();
    if (error) return null;
    return mapExpert(data as unknown as ExpertRow);
  }
}
