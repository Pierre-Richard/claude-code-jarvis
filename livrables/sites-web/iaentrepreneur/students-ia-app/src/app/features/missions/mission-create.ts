import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { SECTEUR_FILTERS, EXPERTISE_FILTERS } from '../../models/data';

@Component({
  selector: 'app-mission-create',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './mission-create.html',
})
export class MissionCreateComponent {
  private readonly router = inject(Router);
  protected readonly secteurs = SECTEUR_FILTERS;
  protected readonly expertises = EXPERTISE_FILTERS.filter((e) => e !== 'Tous');

  protected readonly title = signal('');
  protected readonly desc = signal('');
  protected readonly secteur = signal(SECTEUR_FILTERS[0]);
  protected readonly expertise = signal(this.expertises[0]);
  protected readonly budget = signal('');

  protected back = () => this.router.navigateByUrl('/app/dashboard');
  protected publish = () => this.router.navigateByUrl('/app/dashboard');
}
