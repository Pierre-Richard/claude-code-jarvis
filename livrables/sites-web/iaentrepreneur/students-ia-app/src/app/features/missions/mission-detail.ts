import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../ui/icon';
import { statusStyle } from '../../ui/status';
import { MissionApiService } from '../../core/api/mission.service';
import { Mission, MissionStatus, COMMISSION_RATE } from '../../models/data';

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
  private readonly api = inject(MissionApiService);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly mission = signal<Mission | null>(null);

  constructor() {
    effect(() => {
      const id = this.params()?.get('id');
      if (id) void this.api.get(id).then((m) => this.mission.set(m)).catch(() => this.mission.set(null));
    });
  }

  protected readonly status = computed<MissionStatus>(() => this.mission()?.status ?? 'Demande');

  protected readonly steps = computed(() => {
    const current = STEPS.indexOf(this.status());
    return STEPS.map((label, i) => ({ label, done: i < current, active: i === current }));
  });

  protected readonly nextLabel = computed(() => NEXT_LABEL[this.status()]);
  protected readonly commission = computed(() => Math.round((this.mission()?.budget ?? 0) * COMMISSION_RATE));
  protected readonly net = computed(() => (this.mission()?.budget ?? 0) - this.commission());

  protected async advance(): Promise<void> {
    const m = this.mission();
    if (!m) return;
    const updated = await this.api.advance(m.id);
    this.mission.set(updated);
  }

  protected badge = statusStyle;
  protected euro = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' €';
  protected back = () => this.router.navigateByUrl('/app/dashboard');
}
