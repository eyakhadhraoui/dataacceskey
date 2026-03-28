# 📂 Projet Node.js - Gestion Hiérarchique

## Description
Ce projet est un **backend Node.js** conçu pour gérer des structures hiérarchiques complexes telles que les organisations d'entreprise, les équipes ou tout système nécessitant des relations parent-enfant entre entités.

Il fournit une **API REST** permettant de :

- Créer, lire, mettre à jour et supprimer des entités dans la hiérarchie.
- Maintenir des relations hiérarchiques claires (ex : manager → employé, département → sous-département).
- Visualiser et parcourir la hiérarchie complète ou partielle.
- Rechercher et filtrer des entités selon différents critères (nom, rôle, niveau hiérarchique, département…).
- Sécuriser l’accès via une authentification JWT (optionnelle).

**Exemple concret d’utilisation :**  
Dans une entreprise, chaque employé peut avoir un manager direct et superviser d’autres employés. Ce backend permet de stocker et gérer cette structure, d’obtenir l’arbre complet des employés, et de faciliter la génération de rapports ou l’intégration avec un front-office pour afficher la hiérarchie visuellement.

Le projet est **modulaire et extensible**, permettant d’ajouter facilement de nouvelles fonctionnalités comme l’export de données, les notifications ou les autorisations par rôle.

---

## Technologies utilisées

- Node.js (v18+)

- MongoDB



---

## Installation

1. Cloner le projet :
```bash
git clone <URL_DU_REPO>
cd nom_du_projet
