import { Component, inject, signal } from '@angular/core';
import { IconComponent } from '../../ui/icon';
import { AppState } from '../../core/state/app-state';
import { EXPERTISE_FILTERS, SECTEUR_FILTERS } from '../../models/data';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './profile.html',
})
export class ProfileComponent {
  protected readonly state = inject(AppState);
  protected readonly role = this.state.role;
  protected readonly expertises = EXPERTISE_FILTERS.filter((e) => e !== 'Tous');
  protected readonly secteurs = SECTEUR_FILTERS;

  protected readonly selExpertise = signal<string[]>(['NLP & LLM']);
  protected readonly selSecteurs = signal<string[]>(['Santé']);
  protected readonly available = signal(true);

  protected toggle(kind: 'exp' | 'sec', value: string): void {
    const sig = kind === 'exp' ? this.selExpertise : this.selSecteurs;
    sig.update((list) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]));
  }
}
