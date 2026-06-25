import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { AppState } from '../../core/state/app-state';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './register.html',
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly state = inject(AppState);
  protected readonly choice = signal<'company' | 'expert'>('company');
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly pass = signal('');

  protected submit(): void {
    this.state.setRole(this.choice());
    this.router.navigateByUrl('/app/dashboard');
  }
}
