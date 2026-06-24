import { Component, signal } from '@angular/core';
import { FAQ_ITEMS } from '../../data/content';

@Component({
  selector: 'app-faq',
  template: `
    <section class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">FAQ</span>
          <h2>Vos questions, nos réponses</h2>
        </div>
        <div class="faq">
          @for (item of items; track item.question; let i = $index) {
            <div class="qa" [class.open]="openIndex() === i">
              <button class="qa-q" (click)="toggle(i)">
                {{ item.question }}
                <span class="sign">+</span>
              </button>
              <div class="qa-a">
                <p>{{ item.answer }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Faq {
  protected readonly items = FAQ_ITEMS;
  protected readonly openIndex = signal<number | null>(0);

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
