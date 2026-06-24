import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TESTIMONIALS } from '../../data/content';

@Component({
  selector: 'app-testimonials',
  template: `
    <section class="section section--alt">
      <div class="wrap">
        <div class="section-head reveal">
          <span class="eyebrow">Ils nous font confiance</span>
          <h2>Témoignages clients &amp; experts</h2>
        </div>
        <div class="carousel reveal">
          <div class="slides">
            <div class="slides-track" [style.transform]="'translateX(-' + current() * 100 + '%)'">
              @for (t of testimonials; track t.author) {
                <div class="slide">
                  <div class="quote">
                    <p>"{{ t.quote }}"</p>
                    <div class="who">
                      <div class="av"></div>
                      <div style="text-align:left">
                        <b>{{ t.author }},</b><br />
                        <small>{{ t.role }}</small>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div class="carousel-nav">
            @for (t of testimonials; track t.author; let i = $index) {
              <button
                [class.active]="current() === i"
                (click)="goTo(i)"
                [attr.aria-label]="'Témoignage ' + (i + 1)">
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Testimonials implements OnInit, OnDestroy {
  protected readonly testimonials = TESTIMONIALS;
  protected readonly current = signal(0);
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.timer = setInterval(() => this.next(), 6000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  goTo(index: number): void {
    this.current.set(index);
  }

  private next(): void {
    this.current.update((i) => (i + 1) % this.testimonials.length);
  }
}
