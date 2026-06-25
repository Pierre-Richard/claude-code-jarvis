# Workspace History

> Journal chronologique de toutes les sessions et décisions importantes.
> Le plus récent en haut. Mis à jour automatiquement par Claude.
>
> **Comment ça marche :** Quand je lance la commande `/update` après une session importante, ou quand je raconte un changement significatif, Claude ajoute une entrée ici automatiquement. Je n'ai pas à écrire ce fichier manuellement.

---

## 2026-06-25

### Renommage en IApreneur + démarrage du MVP
- Le projet perso est renommé **IApreneur** (ex-Students IA). La vitrine déjà livrée conserve le nom Students IA ; le produit (app) s'appelle désormais IApreneur. Dossier inchangé : `livrables/sites-web/iaentrepreneur/`
- Décisions de cadrage du MVP actées avec Pierre-Richard :
  - Architecture **hybride** : Supabase (Auth, Storage, Realtime, Postgres + RLS) pour l'infra, **ASP.NET Core** pour la logique métier (matching, missions, paiement), front **Angular 21**. Choix motivé par la montée en compétence .NET
  - Périmètre **MVP standard** : auth entreprise/expert, profils, annuaire + recherche, mise en relation, messagerie temps réel, cycle de mission à 5 statuts, dashboards. Ajout décidé d'une **UI admin** (validation/certification des experts)
  - **Paiement simulé** (pas de Stripe Connect en v1), commission plateforme unique **15 %**
- Travail réalisé :
  - **Prompt Claude Design** pour les écrans produit (`prompt-claude-design-app.md`)
  - **Back .NET** : solution `students-ia-api/` en Clean Architecture (Api/Domain/Application/Infrastructure), 8 entités EF Core, DbContext snake_case, migration initiale, config JWT Supabase + CORS ; script `supabase/setup.sql` (trigger profil, RLS, temps réel)
  - **Front Angular** : app `students-ia-app/` scaffoldée, design tokens repris de la vitrine, supabase-js installé, client Supabase
  - **Implémentation de la maquette IApreneur** (importée via le MCP Claude Design) : 11 écrans Angular (auth, dashboards entreprise/expert/admin, annuaire, fiche expert, création/détail mission avec stepper, messagerie, profils), standalone + signals, sur données mockées. Build vert
- Reste à faire : brancher l'UI sur Supabase (auth, données, messagerie) et l'API .NET (missions, matching, paiement). Nécessite la création du projet Supabase par Pierre-Richard

---

## 2026-06-24

### Nouveau projet perso : Students IA (iaentrepreneur)
- Pierre-Richard démarre un nouveau projet personnel : **Students IA**, une marketplace mettant en relation des entreprises avec des experts IA certifiés (NLP/LLM, MLOps, Computer Vision, Data Strategy, etc.)
- Concept : sélection/certification des experts via une Académie IA, matching entreprise/expert, paiement sécurisé sous séquestre, modèle à la commission (Business 12 %, Expert 8 %)
- Premier livrable produit : site vitrine en Angular 21 (standalone, signals, lazy loading, routage multi-pages : Accueil, Experts, Comment ça marche, Académie, Tarifs) + une landing statique générée depuis un brief Claude Design
- Localisation dans le workspace : `livrables/sites-web/iaentrepreneur/` (app `students-ia/` + `index.html`)
- À noter : apparition d'une arborescence `livrables/` (applications, cabinet, sites-web, youTube) qui structure désormais la production de livrables. Non décrite dans CLAUDE.md, à formaliser si elle se confirme dans la durée
- Ajout du projet dans CONTEXT.md (section projets en cours)

---

## 2026-06-18

### Installation initiale du Jarvis
- Workspace personnalisé pour Pierre-Richard, basé à Paris
- Profil principal : Employé (développeur web salarié, en recherche active d'un nouveau poste)
- Activité : Développeur fullstack Angular / C# .NET avec 5 ans d'expérience, capable de descendre toute la stack du back (ASP.NET Core, Entity Framework Core, APIs REST, auth) au front (Angular, NgRx/Signals/RxJS, composants réutilisables)
- Objectifs court terme identifiés : finir le side project (application de gestion scolaire), décrocher une certif AWS Cloud / IA, monter en compétence sur Angular et .NET (algo, logique, autonomie), démarrer une activité freelance
- Vision long terme : s'installer en freelance avec un TJM confortable et clients récurrents, et lancer un produit SaaS générant un revenu complémentaire
- Projets actifs au démarrage : application de gestion scolaire (élèves, appels, absences, agenda, devoirs, messagerie instantanée) + recherche d'un nouveau poste fullstack
- Domaines d'aide prioritaires : accompagnement technique sur le side project, apprentissage et formation (Angular, .NET, prépa AWS), productivité et organisation au quotidien
- Style de communication choisi : mélange direct/pédagogique selon le contexte
- Note : Pierre-Richard envisage de me donner un autre prénom plus tard, "Jarvis" est temporaire
