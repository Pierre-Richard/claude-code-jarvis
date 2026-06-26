import { Component, inject, signal } from '@angular/core';
import { IconComponent } from '../../ui/icon';
import { AppState } from '../../core/state/app-state';
import { ProfileService } from '../../core/api/profile.service';
import { EXPERTISE_FILTERS, SECTEUR_FILTERS } from '../../models/data';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './profile.html',
})
export class ProfileComponent {
  protected readonly state = inject(AppState);
  private readonly service = inject(ProfileService);
  protected readonly role = this.state.role;
  protected readonly expertises = EXPERTISE_FILTERS.filter((e) => e !== 'Tous');
  protected readonly secteurs = SECTEUR_FILTERS;

  // Expert
  protected readonly headline = signal('');
  protected readonly bio = signal('');
  protected readonly selExpertise = signal<string[]>([]);
  protected readonly selSecteurs = signal<string[]>([]);
  protected readonly languages = signal('');
  protected readonly experienceYears = signal('0');
  protected readonly dailyRate = signal('0');
  protected readonly available = signal(true);

  // Entreprise
  protected readonly companyName = signal('');
  protected readonly sector = signal('');
  protected readonly size = signal('');

  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly saved = signal(false);
  protected readonly error = signal('');

  constructor() {
    void this.load();
  }

  private async load(): Promise<void> {
    this.loading.set(true);
    try {
      if (this.role() === 'expert') {
        const d = await this.service.loadExpert();
        if (d) {
          this.headline.set(d.headline);
          this.bio.set(d.bio);
          this.selExpertise.set(d.expertise);
          this.selSecteurs.set(d.sectors);
          this.languages.set(d.languages);
          this.experienceYears.set(String(d.experienceYears));
          this.dailyRate.set(String(d.dailyRate));
          this.available.set(d.available);
        }
      } else {
        const d = await this.service.loadCompany();
        if (d) {
          this.companyName.set(d.companyName);
          this.sector.set(d.sector);
          this.size.set(d.size);
        }
      }
    } finally {
      this.loading.set(false);
    }
  }

  protected toggle(kind: 'exp' | 'sec', value: string): void {
    const sig = kind === 'exp' ? this.selExpertise : this.selSecteurs;
    sig.update((list) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]));
  }

  protected async save(): Promise<void> {
    this.error.set('');
    this.saved.set(false);
    this.saving.set(true);
    try {
      if (this.role() === 'expert') {
        await this.service.saveExpert({
          fullName: this.state.userName(),
          headline: this.headline(),
          bio: this.bio(),
          expertise: this.selExpertise(),
          sectors: this.selSecteurs(),
          languages: this.languages(),
          experienceYears: Math.max(0, Number(this.experienceYears()) || 0),
          dailyRate: Math.max(0, Number(this.dailyRate()) || 0),
          available: this.available(),
        });
      } else {
        await this.service.saveCompany({
          companyName: this.companyName(),
          sector: this.sector(),
          size: this.size(),
        });
      }
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 2500);
    } catch (e: unknown) {
      this.error.set((e as { message?: string })?.message ?? "Erreur lors de l'enregistrement.");
    } finally {
      this.saving.set(false);
    }
  }
}
