import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './login.html',
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  protected readonly email = signal('');
  protected readonly pass = signal('');
  protected readonly error = signal('');
  protected readonly loading = signal(false);

  protected async submit(): Promise<void> {
    this.error.set('');
    if (!this.email() || !this.pass()) {
      this.error.set('Renseigne ton e-mail et ton mot de passe.');
      return;
    }
    this.loading.set(true);
    try {
      await this.auth.signIn(this.email(), this.pass());
      await this.router.navigateByUrl('/app/dashboard');
    } catch (e: unknown) {
      this.error.set((e as { message?: string })?.message ?? 'Identifiants invalides.');
    } finally {
      this.loading.set(false);
    }
  }
}
