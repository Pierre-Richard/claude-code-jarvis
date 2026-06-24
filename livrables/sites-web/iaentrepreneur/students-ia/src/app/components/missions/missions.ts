import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MISSIONS } from '../../data/content';

@Component({
  selector: 'app-missions',
  imports: [DecimalPipe],
  template: `
    <section class="section section--alt">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">Types de missions</span>
          <h2>Ce que nos experts livrent</h2>
          <p>De la stratégie au déploiement, des interventions calibrées pour des résultats concrets.</p>
        </div>
        <div class="missions">
          @for (mission of missions; track mission.title; let i = $index) {
            <div class="mission reveal">
              <div class="num">{{ (i + 1) | number: '2.0' }}</div>
              <div>
                <h3>{{ mission.title }}</h3>
                <p>{{ mission.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Missions {
  protected readonly missions = MISSIONS;
}
