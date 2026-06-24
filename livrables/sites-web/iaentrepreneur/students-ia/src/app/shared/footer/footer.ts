import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
    <footer class="site-footer">
      <div class="wrap">
        <div class="foot-grid">
          <div>
            <div class="brand" style="display:flex;align-items:center;gap:10px;">
              <span class="dot">◈</span> Students<span class="grad-text">IA</span>
            </div>
            <p class="desc">La marketplace B2B des experts IA certifiés par l'Académie IA. Connecter l'excellence et l'ambition.</p>
          </div>
          <div>
            <h4>Produit</h4>
            <ul>
              <li><a routerLink="/experts">Annuaire d'experts</a></li>
              <li><a routerLink="/comment-ca-marche">Comment ça marche</a></li>
              <li><a routerLink="/tarifs">Tarification</a></li>
              <li><a routerLink="/academie">Académie IA</a></li>
            </ul>
          </div>
          <div>
            <h4>Entreprise</h4>
            <ul>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Carrières</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Légal</h4>
            <ul>
              <li><a href="#">Mentions légales</a></li>
              <li><a href="#">CGU / CGV</a></li>
              <li><a href="#">Politique RGPD</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div class="foot-bottom">
          <span>© 2026 Students IA. Tous droits réservés.</span>
          <span>Fait à Paris · contact&#64;students-ia.fr</span>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {}
