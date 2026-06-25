import { Component, signal } from '@angular/core';
import { IconComponent } from '../../ui/icon';
import { PENDING_EXPERTS, Expert } from '../../models/data';

interface PendingRow extends Expert { decision?: 'approved' | 'rejected'; }

@Component({
  selector: 'app-admin-validation',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './validation.html',
})
export class AdminValidationComponent {
  protected readonly rows = signal<PendingRow[]>(PENDING_EXPERTS.map((e) => ({ ...e })));
  protected euro = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' €';

  protected decide(row: PendingRow, decision: 'approved' | 'rejected'): void {
    this.rows.update((list) => list.map((r) => (r.id === row.id ? { ...r, decision } : r)));
  }
}
