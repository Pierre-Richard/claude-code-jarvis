import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { statusStyle } from '../../ui/status';
import { AppState } from '../../core/state/app-state';
import { MissionApiService } from '../../core/api/mission.service';
import { Mission, Proposal, Stat, ADMIN_STATS, PENDING_EXPERTS } from '../../models/data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly api = inject(MissionApiService);
  protected readonly role = inject(AppState).role;

  protected readonly missions = signal<Mission[]>([]);
  protected readonly proposals = signal<Proposal[]>([]);
  protected readonly loading = signal(true);

  // Admin : données de démonstration (pas encore d'API dédiée).
  protected readonly adminStats = ADMIN_STATS;
  protected readonly pending = PENDING_EXPERTS;

  protected readonly companyStats = computed<Stat[]>(() => {
    const m = this.missions();
    return [
      { label: 'Missions', value: String(m.length), delta: 'Au total', icon: 'briefcase' },
      { label: 'En cours', value: String(m.filter((x) => x.status === 'En cours').length), delta: 'Actives', icon: 'inbox' },
      { label: 'Validées', value: String(m.filter((x) => x.status === 'Validée').length), delta: 'Terminées', icon: 'checkCircle' },
    ];
  });

  protected readonly expertStats = computed<Stat[]>(() => [
    { label: 'Propositions reçues', value: String(this.proposals().length), delta: 'À traiter', icon: 'inbox' },
    { label: 'Missions en cours', value: String(this.missions().length), delta: 'En bonne voie', icon: 'briefcase' },
    { label: 'Taux de réponse', value: '98 %', delta: 'Excellent', icon: 'checkCircle' },
  ]);

  constructor() {
    void this.reload();
  }

  private async reload(): Promise<void> {
    this.loading.set(true);
    try {
      const [missions, proposals] = await Promise.all([this.api.list(), this.api.proposals()]);
      this.missions.set(missions);
      this.proposals.set(proposals);
    } catch {
      this.missions.set([]);
      this.proposals.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  protected async accept(id: string): Promise<void> {
    await this.api.acceptProposal(id);
    await this.reload();
  }

  protected async refuse(id: string): Promise<void> {
    await this.api.refuseProposal(id);
    await this.reload();
  }

  protected badge = statusStyle;
  protected euro = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' €';
  protected open = (id: string) => this.router.navigate(['/app/missions', id]);
  protected go = (url: string) => this.router.navigateByUrl(url);
}
