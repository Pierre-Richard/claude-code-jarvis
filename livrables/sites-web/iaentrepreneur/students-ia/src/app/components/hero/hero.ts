import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <section class="hero section">
      <div class="wrap hero-grid">
        <div>
          <span class="eyebrow">Marketplace B2B d'experts IA certifiés</span>
          <h1>Les meilleurs experts IA, au service de votre <span class="grad-text">transformation</span></h1>
          <p class="lead">La marketplace exclusive d'experts en Intelligence Artificielle, tous certifiés par l'Académie IA. Consultants seniors et diplômés rigoureusement sélectionnés.</p>
          <div class="hero-cta">
            <a routerLink="/experts" class="btn btn-primary">Trouver un expert →</a>
            <a routerLink="/academie" class="btn btn-ghost">Rejoindre comme expert</a>
          </div>
          <div class="hero-trust">
            <div><b>480+</b> experts certifiés</div>
            <div><b>96%</b> de missions réussies</div>
            <div><b>12</b> secteurs couverts</div>
          </div>
        </div>
        <div class="hero-visual">
          <svg class="neural" viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#6366F1" />
                <stop offset="1" stop-color="#06B6D4" />
              </linearGradient>
            </defs>
            <g stroke="url(#g1)" stroke-width="1.2" opacity=".5">
              <line x1="50" y1="60" x2="180" y2="40" /><line x1="50" y1="60" x2="180" y2="130" /><line x1="50" y1="60" x2="180" y2="220" />
              <line x1="50" y1="130" x2="180" y2="40" /><line x1="50" y1="130" x2="180" y2="130" /><line x1="50" y1="130" x2="180" y2="220" />
              <line x1="50" y1="200" x2="180" y2="130" /><line x1="50" y1="200" x2="180" y2="220" />
              <line x1="180" y1="40" x2="320" y2="80" /><line x1="180" y1="130" x2="320" y2="80" /><line x1="180" y1="130" x2="320" y2="180" />
              <line x1="180" y1="220" x2="320" y2="180" /><line x1="320" y1="80" x2="390" y2="130" /><line x1="320" y1="180" x2="390" y2="130" />
            </g>
            <g fill="url(#g1)">
              <circle cx="50" cy="60" r="7" /><circle cx="50" cy="130" r="7" /><circle cx="50" cy="200" r="7" />
              <circle cx="180" cy="40" r="8" /><circle cx="180" cy="130" r="8" /><circle cx="180" cy="220" r="8" />
              <circle cx="320" cy="80" r="8" /><circle cx="320" cy="180" r="8" />
              <circle cx="390" cy="130" r="9" />
            </g>
          </svg>
          <div class="hero-card">
            <div class="av"></div>
            <div>
              <b style="font-size:14px;">Dr. Amine K.</b>
              <small>Expert NLP · Santé</small>
              <div class="stars">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Hero {}
