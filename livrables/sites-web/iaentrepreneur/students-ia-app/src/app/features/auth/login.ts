import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../ui/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './login.html',
})
export class LoginComponent {
  private readonly router = inject(Router);
  protected readonly email = signal('');
  protected readonly pass = signal('');

  protected submit(): void {
    this.router.navigateByUrl('/app/dashboard');
  }
}
