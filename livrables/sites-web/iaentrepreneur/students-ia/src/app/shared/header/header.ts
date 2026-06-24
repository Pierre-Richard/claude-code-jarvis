import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="wrap nav">
        <a class="brand" routerLink="/">
          <span class="dot">◈</span> Students<span class="grad-text">IA</span>
        </a>
        <nav class="nav-links">
          <a routerLink="/experts" routerLinkActive="active">Experts</a>
          <a routerLink="/comment-ca-marche" routerLinkActive="active">Comment ça marche</a>
          <a routerLink="/academie" routerLinkActive="active">Académie</a>
          <a routerLink="/tarifs" routerLinkActive="active">Tarifs</a>
        </nav>
        <div class="nav-cta">
          <a routerLink="/experts" class="btn btn-ghost">Trouver un expert</a>
          <a routerLink="/academie" class="btn btn-primary">Rejoindre</a>
        </div>
      </div>
    </header>
  `,
})
export class Header {}
