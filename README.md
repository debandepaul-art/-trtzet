# Esports Match Tracker

Une petite application web (HTML/CSS/JS) pour créer et enregistrer des scores de matchs e-sport en local (localStorage). Idéal pour commencer un projet **GitHub + GitHub Pages**.

## ✨ Fonctionnalités
- Sélection d'équipes avec logos (SVG locaux)
- Saisie des scores et format (Bo1/Bo3/Bo5/Bo7)
- Notes libres (tournoi, tour, maps, etc.)
- Historique filtrable + recherche
- Export JSON et remise à zéro
- Stockage local (aucun backend)

## 🚀 Démarrer en local
Télécharge le dossier puis ouvre simplement `index.html` dans ton navigateur.

## 🐙 Publier sur GitHub
1. Crée un dépôt public nommé par ex. `esports-match-tracker`.
2. Pousse tous les fichiers à la racine du dépôt (conserve l'arborescence).
3. Active **Pages** : Settings → Pages → Build and deployment → Source: *GitHub Actions*.
4. Le workflow fourni publiera le site sur Pages à chaque push sur la branche `main`.

> L’URL finale ressemble à : `https://<ton-user>.github.io/esports-match-tracker/`

## 🧱 Arborescence
```
.
├── index.html
├── style.css
├── app.js
├── data/
│   └── teams.json
├── assets/
│   └── teams/*.svg
├── .github/workflows/gh-pages.yml
├── README.md
├── LICENSE
└── .gitignore
```

## 🔧 Personnaliser
- Ajoute/supprime des équipes dans `data/teams.json` et mets ton SVG dans `assets/teams/`.
- Remplace le style dans `style.css`.
- La logique de l’app est dans `app.js`.

## 🪪 Licence
MIT — fais-en ce que tu veux, en gardant le copyright.
