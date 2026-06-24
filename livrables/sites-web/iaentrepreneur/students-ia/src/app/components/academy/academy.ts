import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CERTIFICATION_POINTS } from '../../data/content';

@Component({
  selector: 'app-academy',
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="wrap">
        <div class="academy reveal">
          <div class="academy-grid">
            <div>
              <span class="badge-cert">🎖️ Label Académie IA</span>
              <h2 style="margin-top:18px;">Tous nos experts sont certifiés par l'Académie IA</h2>
              <p>Notre certification n'est pas un badge décoratif. C'est un processus exigeant qui garantit le niveau réel de chaque expert avant qu'il rejoigne la marketplace.</p>
              <a routerLink="/tarifs" class="btn btn-primary">Voir le parcours expert →</a>
            </div>
            <div>
              <ul class="cert-list">
                @for (point of points; track point) {
                  <li><span class="ck">✓</span> {{ point }}</li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Academy {
  protected readonly points = CERTIFICATION_POINTS;
}
