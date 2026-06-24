import { Component } from '@angular/core';
import { VALUE_PROPS } from '../../data/content';

@Component({
  selector: 'app-value-props',
  template: `
    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">Une marketplace, trois gagnants</span>
          <h2>Pourquoi Students IA change la donne</h2>
          <p>Un écosystème où la qualité est garantie de bout en bout, par notre certification exclusive.</p>
        </div>
        <div class="cards-3">
          @for (vp of valueProps; track vp.title) {
            <div class="card reveal">
              <div class="ico">{{ vp.icon }}</div>
              <h3>{{ vp.title }}</h3>
              <p>{{ vp.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ValueProps {
  protected readonly valueProps = VALUE_PROPS;
}
