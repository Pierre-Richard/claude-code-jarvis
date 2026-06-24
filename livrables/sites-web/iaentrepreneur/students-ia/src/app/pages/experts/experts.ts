import { Component, computed, signal } from '@angular/core';
import { ExpertCard } from '../../components/expert-card/expert-card';
import { CtaBand } from '../../shared/cta-band/cta-band';
import { EXPERTS, EXPERTISE_FILTERS } from '../../data/content';

@Component({
  selector: 'app-experts',
  imports: [ExpertCard, CtaBand],
  template: `
    <section class="page-intro">
      <div class="wrap">
        <span class="eyebrow">Annuaire d'experts</span>
        <h1>Des profils d'exception, vérifiés un à un</h1>
        <p>Filtrez par expertise pour trouver le spécialiste IA adapté à votre besoin.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="filters">
          @for (filter of filters; track filter) {
            <button
              class="chip"
              [class.active]="activeFilter() === filter"
              (click)="setFilter(filter)">
              {{ filter }}
            </button>
          }
        </div>

        @if (filteredExperts().length > 0) {
          <div class="experts">
            @for (expert of filteredExperts(); track expert.name) {
              <app-expert-card [expert]="expert" />
            }
          </div>
        } @else {
          <p style="text-align:center;color:var(--muted);">Aucun expert ne correspond à ce filtre pour le moment.</p>
        }
      </div>
    </section>

    <app-cta-band />
  `,
})
export class Experts {
  protected readonly filters = EXPERTISE_FILTERS;
  protected readonly activeFilter = signal(EXPERTISE_FILTERS[0]);

  protected readonly filteredExperts = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'Tous') {
      return EXPERTS;
    }
    return EXPERTS.filter((expert) => expert.expertise === filter);
  });

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
  }
}
