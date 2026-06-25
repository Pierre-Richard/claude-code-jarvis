import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { IconComponent } from '../../ui/icon';
import { EXPERTS } from '../../models/data';

@Component({
  selector: 'app-expert-detail',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './expert-detail.html',
})
export class ExpertDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly params = toSignal(this.route.paramMap);

  protected readonly expert = computed(() => {
    const id = this.params()?.get('id');
    return EXPERTS.find((e) => e.id === id) ?? EXPERTS[0];
  });

  protected euro = (n: number) => new Intl.NumberFormat('fr-FR').format(n) + ' €';
  protected back = () => this.router.navigateByUrl('/app/experts');
  protected launch = () => this.router.navigateByUrl('/app/missions/new');
  protected message = () => this.router.navigateByUrl('/app/messages');
}
