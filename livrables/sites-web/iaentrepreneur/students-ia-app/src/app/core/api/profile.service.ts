import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.client';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../state/app-state';

export interface ExpertProfileData {
  fullName: string;
  headline: string;
  bio: string;
  expertise: string[];
  sectors: string[];
  languages: string;
  experienceYears: number;
  dailyRate: number;
  available: boolean;
}

export interface CompanyProfileData {
  companyName: string;
  sector: string;
  size: string;
}

/** Chargement et sauvegarde du profil de l'utilisateur courant (Supabase, RLS propriétaire). */
@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly supabase = inject(SupabaseService).client;
  private readonly auth = inject(AuthService);
  private readonly state = inject(AppState);

  private get userId(): string | null {
    return this.auth.session()?.user.id ?? null;
  }

  async loadExpert(): Promise<ExpertProfileData | null> {
    const id = this.userId;
    if (!id) return null;
    const { data } = await this.supabase
      .from('experts')
      .select('headline, bio, expertise, sectors, languages, experience_years, daily_rate, available, profiles(full_name)')
      .eq('profile_id', id)
      .single();
    if (!data) return null;
    const row = data as unknown as {
      headline: string | null; bio: string | null; expertise: string[] | null; sectors: string[] | null;
      languages: string | null; experience_years: number | null; daily_rate: number | null;
      available: boolean | null; profiles: { full_name: string | null } | null;
    };
    return {
      fullName: row.profiles?.full_name ?? '',
      headline: row.headline ?? '',
      bio: row.bio ?? '',
      expertise: row.expertise ?? [],
      sectors: row.sectors ?? [],
      languages: row.languages ?? '',
      experienceYears: row.experience_years ?? 0,
      dailyRate: row.daily_rate ?? 0,
      available: row.available ?? true,
    };
  }

  async saveExpert(d: ExpertProfileData): Promise<void> {
    const id = this.userId;
    if (!id) return;
    const { error } = await this.supabase.from('experts').update({
      headline: d.headline,
      bio: d.bio,
      expertise: d.expertise,
      sectors: d.sectors,
      languages: d.languages,
      experience_years: d.experienceYears,
      daily_rate: d.dailyRate,
      available: d.available,
    }).eq('profile_id', id);
    if (error) throw error;
  }

  async loadCompany(): Promise<CompanyProfileData | null> {
    const id = this.userId;
    if (!id) return null;
    const { data } = await this.supabase
      .from('companies')
      .select('company_name, sector, size')
      .eq('profile_id', id)
      .single();
    if (!data) return null;
    return {
      companyName: data.company_name ?? '',
      sector: data.sector ?? '',
      size: data.size ?? '',
    };
  }

  async saveCompany(d: CompanyProfileData): Promise<void> {
    const id = this.userId;
    if (!id) return;
    const { error } = await this.supabase.from('companies').update({
      company_name: d.companyName,
      sector: d.sector,
      size: d.size,
    }).eq('profile_id', id);
    if (error) throw error;
    // Garde le nom affiché (sidebar) cohérent avec le nom d'entreprise.
    await this.supabase.from('profiles').update({ full_name: d.companyName }).eq('id', id);
    this.state.fullName.set(d.companyName);
  }
}
