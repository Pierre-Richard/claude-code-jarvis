import { Component } from '@angular/core';
import { PricingTable } from '../../components/pricing-table/pricing-table';
import { Faq } from '../../components/faq/faq';
import { CtaBand } from '../../shared/cta-band/cta-band';

@Component({
  selector: 'app-pricing',
  imports: [PricingTable, Faq, CtaBand],
  template: `
    <section class="page-intro">
      <div class="wrap">
        <span class="eyebrow">Tarifs</span>
        <h1>Une tarification transparente</h1>
        <p>Pas d'abonnement caché. Vous payez uniquement quand une mission est lancée.</p>
      </div>
    </section>
    <app-pricing-table />
    <app-faq />
    <app-cta-band />
  `,
})
export class Pricing {}
