import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { ValueProps } from '../../components/value-props/value-props';
import { Sectors } from '../../components/sectors/sectors';
import { Testimonials } from '../../components/testimonials/testimonials';
import { CtaBand } from '../../shared/cta-band/cta-band';

@Component({
  selector: 'app-home',
  imports: [Hero, ValueProps, Sectors, Testimonials, CtaBand],
  template: `
    <app-hero />
    <app-value-props />
    <app-sectors />
    <app-testimonials />
    <app-cta-band />
  `,
})
export class Home {}
