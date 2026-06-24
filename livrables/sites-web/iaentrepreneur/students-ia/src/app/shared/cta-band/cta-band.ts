import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-band',
  imports: [RouterLink],
  template: `
    <section class="section cta-band">
      <div class="wrap">
        <div class="cta-inner reveal">
          <h2>Prêt à accélérer votre transformation IA ?</h2>
          <p>Rejoignez les entreprises et les experts qui ont choisi l'excellence.</p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <a routerLink="/experts" class="btn btn-ghost">Trouver un expert</a>
            <a routerLink="/academie" class="btn" style="background:#fff;color:var(--ink);">Rejoindre comme expert</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CtaBand {}
