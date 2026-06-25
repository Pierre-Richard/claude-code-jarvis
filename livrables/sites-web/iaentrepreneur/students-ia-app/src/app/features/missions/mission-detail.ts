import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../ui/icon';
import { statusStyle } from '../../ui/status';
import { COMPANY_MISSIONS, EXPERT_MISSIONS, COMMISSION_RATE, MissionStatus } from '../../models/data';

const STEPS: MissionStatus[] = ['Demande', 'Cadrage', 'En cours', 'Livrée', 'Validée'];
const NEXT_LABEL: Record<MissionStatus, string> = {
  'Demande': 'Démarrer le cadrage',
  'Cadrage': 'Lancer la mission',
  'En cours': 'Marquer comme livrée',
  'Livrée': 'Valider et payer',
  'Validée': 'Mission terminée',
};

@Component({
  selector: 'app-mission-detail',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './mission-detail.html',
})
export class MissionDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly mission = computed(() => {
    const id = this.params()?.get('id');
    return [...COMPANY_MISSIONS, ...EXPERT_MISSIONS].find((m) => m.id === id) ?? COMPANY_MISSIONS[0];
  });

  protected readonly status = signal<MissionStatus>('En cours');

  constructor() {
    queueMicrotask(() => this.status.set(this.mission().status));
  }

  protected readonly steps = computed(() => {
    const current = STEPS.indexOf(this.status());
    return STEPS.map((label, i) => ({ label, done: i < current, active: i === current }));
  });

  protected readonly nextLabel = computed(() => NEXT_LABEL[this.status()]);
  protected readonly commission = computed(() => Math.round(this.mission().budget * COMMISSION_RATE));
  protected readonly net = computed(() => this.mission().budget - this.commission());

  protected advance(): void {
    const i = STEPS.indexOf(this.status());
    if (i < STEPS.length - 1) this.status.set(STEPS[i + 1]);
  }

  protected badge = statusStyle;
  protected euro = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' €';
  protected back = () => this.router.navigateByUrl('/app/dashboard');
}
