import { Component } from '@angular/core';
import { SECTORS } from '../../data/content';

@Component({
  selector: 'app-sectors',
  template: `
    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">Secteurs couverts</span>
          <h2>Une expertise pour chaque industrie</h2>
        </div>
        <div class="sectors">
          @for (sector of sectors; track sector.name) {
            <div class="sector reveal">
              <div class="ico">{{ sector.icon }}</div>
              <span>{{ sector.name }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Sectors {
  protected readonly sectors = SECTORS;
}
