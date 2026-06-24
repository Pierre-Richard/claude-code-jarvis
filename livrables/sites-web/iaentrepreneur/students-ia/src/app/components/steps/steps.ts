import { Component } from '@angular/core';
import { STEPS } from '../../data/content';

@Component({
  selector: 'app-steps',
  template: `
    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">Comment ça marche</span>
          <h2>Votre expert IA en 4 étapes</h2>
        </div>
        <div class="steps">
          @for (step of steps; track step.title; let i = $index) {
            <div class="step reveal">
              <div class="badge">{{ i + 1 }}</div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Steps {
  protected readonly steps = STEPS;
}
