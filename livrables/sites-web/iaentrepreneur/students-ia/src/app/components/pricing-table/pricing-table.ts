import { Component } from '@angular/core';
import { PLANS } from '../../data/content';

@Component({
  selector: 'app-pricing-table',
  template: `
    <section class="section section--alt">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">Tarification transparente</span>
          <h2>Un modèle simple, sans surprise</h2>
          <p>Pas de frais cachés. Une commission claire qui finance la sélection, le suivi qualité et la sécurisation des paiements.</p>
        </div>
        <div class="pricing">
          @for (plan of plans; track plan.name) {
            <div class="plan reveal" [class.feature]="plan.featured">
              <h3>{{ plan.name }}</h3>
              <div class="price">{{ plan.price }}<small>{{ plan.priceNote }}</small></div>
              <p style="color:var(--muted);font-size:14px;">{{ plan.caption }}</p>
              <ul>
                @for (feature of plan.features; track feature) {
                  <li><span class="ck">✓</span> {{ feature }}</li>
                }
              </ul>
              <a href="#" class="btn" [class.btn-primary]="plan.featured" [class.btn-ghost]="!plan.featured">{{ plan.cta }}</a>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class PricingTable {
  protected readonly plans = PLANS;
}
