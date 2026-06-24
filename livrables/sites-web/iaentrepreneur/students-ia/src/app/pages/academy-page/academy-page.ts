import { Component } from '@angular/core';
import { Academy } from '../../components/academy/academy';
import { CtaBand } from '../../shared/cta-band/cta-band';

@Component({
  selector: 'app-academy-page',
  imports: [Academy, CtaBand],
  template: `
    <section class="page-intro">
      <div class="wrap">
        <span class="eyebrow">Académie IA</span>
        <h1>La certification qui fait la différence</h1>
        <p>Un label exigeant qui garantit le niveau réel de chaque expert de la marketplace.</p>
      </div>
    </section>
    <app-academy />
    <app-cta-band />
  `,
})
export class AcademyPage {}
