import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { ExpertService } from '../../core/api/expert.service';
import { Expert, EXPERTISE_FILTERS, SECTEUR_FILTERS } from '../../models/data';

@Component({
  selector: 'app-experts',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './experts.html',
})
export class ExpertsComponent {
  private readonly router = inject(Router);
  private readonly service = inject(ExpertService);
  protected readonly expertiseFilters = EXPERTISE_FILTERS;
  protected readonly secteurFilters = SECTEUR_FILTERS;

  protected readonly allExperts = signal<Expert[]>([]);
  protected readonly loading = signal(true);

  protected readonly expertise = signal('Tous');
  protected readonly secteur = signal<string | null>(null);
  protected readonly onlyAvailable = signal(false);

  constructor() {
    this.service.list()
      .then((list) => this.allExperts.set(list))
      .catch(() => this.allExperts.set([]))
      .finally(() => this.loading.set(false));
  }

  protected readonly filtered = computed(() => {
    const exp = this.expertise();
    const sec = this.secteur();
    const dispo = this.onlyAvailable();
    return this.allExperts().filter((e) => {
      if (exp !== 'Tous' && e.expertise !== exp) return false;
      if (sec && !e.sectors.includes(sec)) return false;
      if (dispo && !e.available) return false;
      return true;
    });
  });

  protected euro = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' €';
  protected open = (id: string) => this.router.navigate(['/app/experts', id]);
  protected reset(): void {
    this.expertise.set('Tous');
    this.secteur.set(null);
    this.onlyAvailable.set(false);
  }
}
