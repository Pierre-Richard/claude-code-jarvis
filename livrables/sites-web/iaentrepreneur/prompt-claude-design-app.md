# Prompt Claude Design — Students IA (Application produit / MVP)

> À utiliser sur https://claude.ai/design
> Objectif : générer les écrans de l'application connectée (le produit), dans la
> continuité visuelle exacte du site vitrine déjà existant.

---

Conçois l'interface d'une **application web SaaS** nommée **"Students IA"**, la marketplace
qui met en relation des **experts en Intelligence Artificielle** (consultants seniors,
certifiés par notre Académie) avec des **entreprises** qui veulent implémenter l'IA, former
leurs équipes ou lancer un projet IA.

Ce n'est PAS une landing page : c'est l'application connectée derrière le site vitrine.
L'utilisateur s'inscrit, se connecte, et accède à un espace de travail avec navigation
persistante. Génère des écrans produit réalistes, fonctionnels et cohérents entre eux.

## IDENTITÉ VISUELLE (à respecter STRICTEMENT, c'est la continuité de notre vitrine)

- **Palette** :
  - Fond application : blanc cassé `#FAFAFA`
  - Surfaces / cartes : blanc `#ffffff`
  - Texte principal (encre) : bleu nuit `#0A1628`
  - Texte secondaire : `#3a4a63` ; texte tertiaire / labels : `#6b7789`
  - Bordures / séparateurs : `#e7e9ef`
  - Accent / dégradé signature : `linear-gradient(120deg, #6366F1 0%, #06B6D4 100%)` (indigo → cyan)
  - Accent indigo plein pour les puces et coches : `#4f46e5`
- **Typographie** : Inter (sans-serif moderne), titres en `font-weight 700`, `letter-spacing -0.02em`,
  corps de texte `line-height 1.6`. Grandes respirations.
- **Composants** : cartes à coins arrondis `border-radius 16px`, ombre douce
  `0 1px 2px rgba(10,22,40,.04), 0 12px 32px rgba(10,22,40,.06)`, légère élévation au survol.
- **Boutons** : primaire = fond dégradé indigo→cyan, texte blanc, ombre colorée ; secondaire = fond
  blanc, bordure `#e7e9ef`. Coins arrondis `12px`.
- **Chips / filtres** : pilule arrondie ; état actif = fond dégradé indigo→cyan, texte blanc.
- **Tags** : petit fond gris `#f1f3f8`, texte `#3a4a63`, arrondi `8px`.
- **Style général** : tech haut de gamme, épuré, inspiré de Linear, Vercel et Stripe.
  Glassmorphism léger autorisé sur la top-bar. Micro-animations subtiles. Pas de jargon marketing creux.
- **Langue** : Français.

## STRUCTURE DE L'APP (shell connecté)

Toutes les pages connectées partagent :
- une **barre latérale gauche** (navigation) : logo Students IA (carré dégradé + nom), liens de
  navigation selon le rôle, avatar + nom de l'utilisateur en bas avec menu (profil, déconnexion) ;
- une **top-bar** : titre de la page courante, barre de recherche globale, cloche de notifications,
  bouton d'action principal contextuel.

La navigation latérale diffère selon le rôle connecté (entreprise ou expert).

## ÉCRANS À GÉNÉRER

### A. Authentification (hors shell, plein écran, épuré)

1. **Inscription avec choix de rôle**
   - Deux grandes cartes cliquables côte à côte : « Je suis une entreprise » (icône bâtiment) et
     « Je suis un expert IA » (icône cible). La carte sélectionnée prend la bordure dégradée.
   - Champs : nom complet, e-mail, mot de passe. Bouton primaire « Créer mon compte ».
   - Colonne latérale décorative avec dégradé indigo→cyan et une phrase de réassurance.

2. **Connexion** : e-mail, mot de passe, « mot de passe oublié », bouton primaire « Se connecter ».

### B. Onboarding / Profil

3. **Profil expert (édition)** : avatar (upload), titre/headline, bio, domaines d'expertise
   (multi-sélection : Machine Learning, NLP & LLM, Computer Vision, MLOps, Data Strategy),
   secteurs (chips multi : Santé, Finance, Retail, Industrie, Juridique…), langues, années
   d'expérience, TJM (€/jour), interrupteur « Disponible pour des missions ». Badge « Certifié »
   si validé. Bouton « Enregistrer ».

4. **Profil entreprise (édition)** : logo, nom de l'entreprise, secteur, taille, description courte.

### C. Côté ENTREPRISE

5. **Dashboard entreprise** : cartes de stats en haut (missions en cours, propositions reçues,
   experts contactés), liste « Mes missions » avec leur statut (badge coloré), bouton primaire
   « + Lancer une mission ». État vide soigné si aucune mission.

6. **Annuaire des experts (recherche)** : barre de recherche + rangée de chips de filtres
   (expertise, secteur, disponibilité, langue). Grille de **cartes expert** (réutilise le style de
   la vitrine) : avatar carré dégradé, nom, rôle/spécialité, note en étoiles, tags secteurs/langues,
   TJM en bas, bouton « Voir le profil ». Pagination ou défilement.

7. **Fiche expert détaillée** : en-tête avec avatar, nom, headline, note, badge « Certifié »,
   TJM, bouton primaire « Lancer une mission avec cet expert » + bouton secondaire « Envoyer un
   message ». Sections : à propos, expertises (tags), secteurs, langues, expérience.

8. **Création de mission (formulaire)** : titre, description, secteur, expertise recherchée,
   budget indicatif. À la soumission, message indiquant que des experts vont être proposés (matching).

### D. Côté EXPERT

9. **Dashboard expert** : cartes de stats (missions proposées, missions en cours, taux de réponse),
   liste « Propositions de mission » avec boutons Accepter / Refuser, et « Mes missions en cours ».

### E. Commun : Missions & Messagerie

10. **Détail d'une mission** : titre, entreprise (ou expert selon le rôle), description, secteur,
    budget. Un **stepper horizontal** affichant le cycle de vie en 5 étapes :
    `Demande → Cadrage → En cours → Livrée → Validée`, l'étape courante mise en avant avec le
    dégradé. Encadré récap (montant, commission, paiement). Bouton d'action selon le statut.
    Au statut « Validée », afficher un récap de paiement simulé (montant, commission plateforme).

11. **Messagerie** : deux colonnes. À gauche, liste des conversations (avatar, nom, dernier
    message, horodatage, pastille non-lu). À droite, le fil de discussion (bulles alignées
    gauche/droite selon l'émetteur), champ de saisie en bas avec bouton d'envoi dégradé.

## ÉTATS À PRÉVOIR
Pour chaque liste, prévois un **état vide** élégant (illustration légère + phrase + bouton d'action)
et montre au moins un exemple d'**état chargé** avec des données réalistes (noms d'experts type
« Dr. Amine Khelifi — Expert NLP & LLM », TJM autour de 700–950 €/j, secteurs variés).

## TON RÉDACTIONNEL
Direct, expert, rassurant. Met en avant la qualité et la sélection rigoureuse. Pas de blabla marketing.

---

> Note d'intégration (pour Pierre-Richard, pas pour Claude Design) :
> ces écrans seront ensuite reconstruits en Angular 21 (standalone + signals) dans
> `students-ia-app/`, en réutilisant `styles.scss` et les composants de la vitrine.
