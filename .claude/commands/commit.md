# /commit

Sauvegarde les changements en cours avec un commit Git propre.

## Étapes

1. **Vérifier l'état du repo** : lance `git status` pour lister les fichiers modifiés, ajoutés ou supprimés
2. **Inspecter les changements** : lance `git diff` et `git diff --staged` pour comprendre précisément ce qui a changé
3. **Vérifier qu'aucun secret ne soit commité** : scanner les fichiers modifiés pour détecter des patterns sensibles (clés API, mots de passe, tokens, fichiers .env) — bloquer et alerter si quelque chose est suspect
4. **Rédiger le message de commit** : formuler un message clair et concis en français, au présent ("Ajoute X", "Corrige Y", "Refactorise Z"), qui résume l'intention des changements
5. Demande confirmation avant de committer
6. Stage les fichiers pertinents et crée le commit

## Règles

- Ne jamais committer de fichiers sensibles (.env, secrets, credentials)
- Le message doit être en français, concis (1 ligne max), au présent ("Ajoute X", "Corrige Y", "Refactorise Z")
- Toujours afficher le message proposé et demander validation avant d'exécuter
- Si aucun changement détecté, le signaler clairement
