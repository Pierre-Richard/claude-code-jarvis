import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { SECTEUR_FILTERS, EXPERTISE_FILTERS } from '../../models/data';
import { MissionApiService } from '../../core/api/mission.service';

@Component({
  selector: 'app-mission-create',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './mission-create.html',
})
export class MissionCreateComponent {
  private readonly router = inject(Router);
  private readonly api = inject(MissionApiService);
  protected readonly secteurs = SECTEUR_FILTERS;
  protected readonly expertises = EXPERTISE_FILTERS.filter((e) => e !== 'Tous');

  protected readonly title = signal('');
  protected readonly desc = signal('');
  protected readonly secteur = signal(SECTEUR_FILTERS[0]);
  protected readonly expertise = signal(this.expertises[0]);
  protected readonly budget = signal('');
  protected readonly error = signal('');
  protected readonly loading = signal(false);

  protected back = () => this.router.navigateByUrl('/app/dashboard');

  protected async publish(): Promise<void> {
    this.error.set('');
    if (!this.title() || !this.desc()) {
      this.error.set('Renseigne au moins un titre et une description.');
      return;
    }
    this.loading.set(true);
    try {
      const budget = this.budget() ? Number(this.budget().replace(/\s/g, '')) : null;
      const mission = await this.api.create({
        title: this.title(),
        description: this.desc(),
        sector: this.secteur(),
        expertise: this.expertise(),
        budget: Number.isFinite(budget) ? budget : null,
      });
      await this.router.navigate(['/app/missions', mission.id]);
    } catch (e: unknown) {
      this.error.set((e as { message?: string })?.message ?? 'Erreur lors de la création.');
    } finally {
      this.loading.set(false);
    }
  }
}
