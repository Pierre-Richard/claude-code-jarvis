import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '../../ui/icon';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './register.html',
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  protected readonly choice = signal<'company' | 'expert'>('company');
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly pass = signal('');
  protected readonly error = signal('');
  protected readonly loading = signal(false);

  protected async submit(): Promise<void> {
    this.error.set('');
    if (!this.name() || !this.email() || !this.pass()) {
      this.error.set('Renseigne ton nom, ton e-mail et un mot de passe.');
      return;
    }
    this.loading.set(true);
    try {
      await this.auth.signUp(this.email(), this.pass(), this.name(), this.choice());
      await this.router.navigateByUrl('/app/dashboard');
    } catch (e: unknown) {
      this.error.set((e as { message?: string })?.message ?? "Erreur lors de l'inscription.");
    } finally {
      this.loading.set(false);
    }
  }
}
