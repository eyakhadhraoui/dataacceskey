# dataacceskey
Ce projet est un backend Node.js conçu pour gérer des structures hiérarchiques complexes telles que les organisations d'entreprise, les équipes ou tout système nécessitant des relations parent-enfant entre entités..Maintenir des relations hiérarchiques(ex : manager → employé, département → sous-département). 
Il permet de :
Ajouter, modifier et supprimer des entités dans la hiérarchie.
Consulter la hiérarchie complète ou partielle.
Rechercher et filtrer selon différents critères.
Gérer les relations parent-enfant (ex: manager-employé).
2. Technologies utilisées
Node.js
MongoDB 
4. Structure du projet
/project-root
│
├─ /controllers    # Logique des routes
├─ /models         # Schémas et modèles de données
├─ /routes         # Définition des endpoints
├─ /middlewares    # Middlewares (auth, erreurs, etc.)
├─ /utils          # Fonctions utilitaires
├─ server.js       # Point d’entrée de l’application
└─ .env
5. Endpoints API

Exemple avec une entité Employee :

Méthode	URL	Description
GET	/api/employees	Récupérer tous les employés
GET	/api/employees/:id	Récupérer un employé par ID
POST	/api/employees	Ajouter un employé
PUT	/api/employees/:id	Modifier un employé
DELETE	/api/employees/:id	Supprimer un employé

Exemple de payload pour créer un employé :

{
  "name": "John Doe",
  "role": "Manager",
  "parentId": "642f1a2e5f4c2b3d5a7e1234" 
}
