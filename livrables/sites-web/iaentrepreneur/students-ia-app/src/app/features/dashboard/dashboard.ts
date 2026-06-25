import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { statusStyle } from '../../ui/status';
import { AppState } from '../../core/state/app-state';
import {
  COMPANY_STATS, EXPERT_STATS, ADMIN_STATS, COMPANY_MISSIONS, EXPERT_MISSIONS,
  PROPOSALS, PENDING_EXPERTS,
} from '../../models/data';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private readonly router = inject(Router);
  protected readonly role = inject(AppState).role;
  protected readonly companyStats = COMPANY_STATS;
  protected readonly expertStats = EXPERT_STATS;
  protected readonly adminStats = ADMIN_STATS;
  protected readonly companyMissions = COMPANY_MISSIONS;
  protected readonly expertMissions = EXPERT_MISSIONS;
  protected readonly proposals = PROPOSALS;
  protected readonly pending = PENDING_EXPERTS;

  protected badge = statusStyle;
  protected euro = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' €';
  protected open = (id: string) => this.router.navigate(['/app/missions', id]);
  protected go = (url: string) => this.router.navigateByUrl(url);
}
