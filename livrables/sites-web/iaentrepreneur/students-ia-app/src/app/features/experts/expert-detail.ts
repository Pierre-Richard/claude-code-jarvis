import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../ui/icon';
import { ExpertService } from '../../core/api/expert.service';
import { Expert } from '../../models/data';

@Component({
  selector: 'app-expert-detail',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './expert-detail.html',
})
export class ExpertDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ExpertService);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly expert = signal<Expert | null>(null);

  constructor() {
    effect(() => {
      const id = this.params()?.get('id');
      if (id) void this.service.getById(id).then((e) => this.expert.set(e));
    });
  }

  protected euro = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' €';
  protected back = () => this.router.navigateByUrl('/app/experts');
  protected launch = () => this.router.navigateByUrl('/app/missions/new');
  protected message = () => this.router.navigateByUrl('/app/messages');
}
