# Livrables

Ce dossier contient tout ce que Claude produit pour Pierre-Richard.

---

## Règle d'or

| Direction | Emplacement |
|-----------|-------------|
| **Inputs** (documents que tu fournis : PDFs, exports, notes, captures) | `context/import/` |
| **Outputs** (ce que Claude produit pour toi : code, textes, briefs, outils) | `livrables/` |

---

## Organisation

```
livrables/
├── sites-web/       # Sites internet, landing pages, portfolios
├── applications/    # Outils, scripts, automatisations
├── youTube/         # Briefs vidéo, scripts, hooks, calendrier éditorial
└── cabinet/         # Livrables pour ton activité freelance
```

---

## Convention de nommage

Chaque projet est rangé dans un sous-dossier nommé selon ce format :

```
YYYY-MM_[nom-court-du-projet]/
```

Exemples :
- `2026-06_landing-page-saas/`
- `2026-07_script-youtube-angular/`
- `2026-06_proposition-client-dupont/`

**Règles :**
- Minuscules uniquement
- Mots séparés par des tirets (`-`)
- Date en préfixe `YYYY-MM` pour un tri chronologique naturel
- Nom court et descriptif, pas de caractères spéciaux

---

## Contenu d'un projet

À l'intérieur de chaque dossier de projet, libre organisation. Quelques conventions utiles :

- `v1/`, `v2/` pour versionner les itérations majeures
- `final/` pour la version validée et livrée
- Un fichier `notes.md` si le projet nécessite du contexte
