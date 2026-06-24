import { Component } from '@angular/core';
import { Steps } from '../../components/steps/steps';
import { Missions } from '../../components/missions/missions';
import { CtaBand } from '../../shared/cta-band/cta-band';

@Component({
  selector: 'app-how-it-works',
  imports: [Steps, Missions, CtaBand],
  template: `
    <section class="page-intro">
      <div class="wrap">
        <span class="eyebrow">Comment ça marche</span>
        <h1>Un parcours simple, du besoin à la mission</h1>
        <p>Quelques étapes suffisent pour être mis en relation avec l'expert IA qu'il vous faut.</p>
      </div>
    </section>
    <app-steps />
    <app-missions />
    <app-cta-band />
  `,
})
export class HowItWorks {}
