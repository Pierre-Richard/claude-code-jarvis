import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Expert } from '../../data/models';

@Component({
  selector: 'app-expert-card',
  imports: [DecimalPipe],
  template: `
    <article class="expert reveal">
      <div class="expert-top">
        <div class="photo"></div>
        <div>
          <h3>{{ expert().name }}</h3>
          <div class="role">{{ expert().role }} · {{ expert().experienceYears }} ans</div>
        </div>
      </div>
      <div class="tags">
        @for (sector of expert().sectors; track sector) {
          <span class="tag">{{ sector }}</span>
        }
        <span class="tag">{{ expert().langs }}</span>
      </div>
      <div class="expert-foot">
        <span class="stars">★★★★★ <span style="color:var(--muted)">{{ expert().rating | number: '1.1-1' }}</span></span>
        <span class="price">{{ expert().dailyRate }} € <small style="font-weight:400;color:var(--muted)">/ j</small></span>
      </div>
    </article>
  `,
})
export class ExpertCard {
  readonly expert = input.required<Expert>();
}
