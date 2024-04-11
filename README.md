# Documentation

L'API RestoReserve est une API qui permet de gérer des réservations de restaurants.

## Authentification

### Inscription (POST /auth/signup)

Crée un nouvel utilisateur.

#### Paramètres de la requête

| Nom         | Type   | Description         |
|-------------|--------|---------------------|
| name        | String | Nom de l'utilisateur|
| email       | String | Adresse e-mail de l'utilisateur |
| password    | String | Mot de passe de l'utilisateur |

#### Exemple de requête

```json
POST /auth/signup
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
```

#### Réponse réussie

Code : 201 Created

```json
{
    "message": "Utilisateur créé !"
}
```

---

### Connexion (POST /auth/login)

Connecte un utilisateur existant.

#### Paramètres de la requête

| Nom         | Type   | Description         |
|-------------|--------|---------------------|
| email       | String | Adresse e-mail de l'utilisateur |
| password    | String | Mot de passe de l'utilisateur |

#### Exemple de requête

```json
POST /auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

#### Réponse réussie

Code : 200 OK

```json
{
    "userId": "123456789",
    "message": "Utilisateur connecté"
}
```

---

### Déconnexion (GET /auth/logout)

Déconnecte l'utilisateur actuellement connecté.


#### Réponse réussie

Code : 200 OK

```json
{
    "message": "Utilisateur déconnecté"
}
```

---

## Restaurants et tables

### Créer un restaurant (POST /restaurants/register)

Crée un nouveau restaurant. L'utilisateur doit être connecté pour effectuer cette action. L'utilisateur connecté est automatiquement associé au restaurant créé en tant que propriétaire.

#### Paramètres de la requête

| Nom         | Type   | Description         |
|-------------|--------|---------------------|
| name        | String | Nom du restaurant |
| address     | String | Adresse du restaurant |
| postal_code | String | Code postal du restaurant |
| city        | String | Ville du restaurant |

#### Exemple de requête

```json
POST /restaurants/register
Content-Type: application/json

{
    "name": "Restaurant XYZ",
    "address": "123 Rue de la Paix",
    "postal_code": "75000",
    "city": "Paris"
}
```

#### Réponse réussie

Code : 201 Created

```json
{
    "message": "Restaurant créé !"
}
```

---

### Récupérer tous les restaurants (GET /restaurants)

Récupère la liste de tous les restaurants.

#### Réponse réussie

Code : 200 OK

```json
[
    {
        "_id": "606e7a1bc70b906baf3a12ae",
        "name": "Restaurant ABC",
        "address": "456 Rue de la Liberté",
        "postal_code": "69000",
        "city": "Lyon"
    },
    {
        "_id": "606e7a32c70b906baf3a12af",
        "name": "Restaurant XYZ",
        "address": "123 Rue de la Paix",
        "postal_code": "75000",
        "city": "Paris"
    }
]
```

---

### Récupérer un restaurant (GET /restaurants/:id)

Récupère un restaurant spécifique en fonction de son identifiant.

#### Réponse réussie

Code : 200 OK

```json
{
    "_id": "606e7a1bc70b906baf3a12ae",
    "name": "Restaurant les 3 Brasseurs",
    "address": "456 Rue de la Liberté",
    "postal_code": "13002",
    "city": "Marseille"
}
```
---

### Créer une table pour un restaurant (POST /restaurants/:restaurantId/tables)

Crée une nouvelle table pour un restaurant spécifique. L'utilisateur doit être connecté pour effectuer cette action. L'utilisateur connecté doit être le propriétaire du restaurant pour effectuer cette action.

#### Paramètres de la requête

| Nom         | Type   | Description         |
|-------------|--------|---------------------|
| capacity    | Number | Capacité de la table |
| name        | String | Nom de la table (facultatif) |
| infos       | String | Informations complémentaires sur la table (facultatif) |

#### Exemple de requête

```json
POST /restaurants/661668a8d877e79772fdd5db/tables
Content-Type: application/json

{
    "name": "Table 1",
    "capacity": 4,
    "infos": "Coin tranquille près de la fenêtre"
}
```
#### Réponse réussie

Code : 201 Created

```json
{
    "message": "Table créée !"
}
```

---

### Récupérer les tables d'un restaurant (GET /restaurants/:restaurantId/tables)

Récupère les tables d'un restaurant spécifique.

#### Réponse réussie

Code : 200 OK

```json
[
    {
        "_id": "606e7a99c70b906baf3a12b0",
        "name": "Table 1",
        "capacity": 4,
        "infos": "Coin tranquille près de la fenêtre"
    },
    {
        "_id": "606e7ab6c70b906baf3a12b1",
        "name": "Table 2",
        "capacity": 6,
        "infos": "Table ronde au centre de la salle"
    }
]
```

---

### Ajouter une disponibilité à toute les tables d'un restaurant (POST /restaurants/:restaurantId/avalaibilities)

Ajoute une disponibilité à toutes les tables d'un restaurant spécifique. L'utilisateur doit être connecté pour effectuer cette action. L'utilisateur connecté doit être le propriétaire du restaurant pour effectuer cette action.

#### Paramètres de la requête

| Nom         | Type   | Description         |
|-------------|--------|---------------------|
| startTime   | Date   | Date et heure de début de la disponibilité |
| endTime     | Date   | Date et heure de fin de la disponibilité (facultatif, si non renseigné endTime = startTime + 1 heure) |

#### Exemple de requête

```json
POST /restaurants/661668a8d877e79772fdd5db/avalaibilities
Content-Type: application/json

{
    "startTime": "2024-05-08T19:00:00.000Z",
    "endTime": "2024-05-08T20:00:00.000Z"
}
```
#### Réponse réussie

Code : 201 Created

```json
{
    "message": "Disponibilité créée !"
}
```
---
### Récupérer les disponibilités d'un restaurant (GET /restaurants/:restaurantId/availabilities)

Récupère les disponibilités d'un restaurant spécifique.

### Filtres de recherche

Vous pouvez utiliser les paramètres de requête suivants pour filtrer les disponibilités :

- startTime (optionnel) : Filtre les disponibilités pour afficher uniquement celles qui commencent après ou au moment spécifié. Le format de date accepté est ISO 8601 (par exemple, "2024-08-31T03:40:00.000Z").
- endTime (optionnel) : Filtre les disponibilités pour afficher uniquement celles qui se terminent avant ou au moment spécifié. Le format de date accepté est également ISO 8601.
- status (optionnel) : Filtre les disponibilités pour afficher uniquement celles qui ont un statut spécifique. Les valeurs possibles sont "available", "pending" et "reserved".

#### Exemple de requête

```json
GET /restaurants/6616c1949130acadb907d1b2/availabilities?startTime=2024-05-08T20:00:00.000Z&status=available
```

#### Réponse réussie

Code : 200 OK

```json
[
    {
        "_id": "661811d5128250ab0a4e6da3",
        "startTime": "2024-05-08T20:00:00.000Z",
        "endTime": "2024-05-08T21:00:00.000Z",
        "status": "available",
        "restaurant": "6616c1949130acadb907d1b2",
        "--v": 0
    },
    {
        "_id": "66181390128250ab0a4e6da5",
        "startTime": "2024-05-08T21:00:00.000Z",
        "endTime": "2024-05-08T22:00:00.000Z",
        "status": "available",
        "restaurant": "6616c1949130acadb907d1b2",
        "--v": 0
    }
]
```
---

### Récupérer une table à partir de son ID (GET /tables/:tableId)

Récupère une table spécifique en fonction de son identifiant.

#### Réponse réussie

Code : 200 OK

```json
{
    "_id": "661668a3d877e79772fdd5d6",
    "capacity": 4,
    "name": "Table 12",
    "infos": "Coin tranquille près de la fenêtre",    "availabilities": [
        "661668efd877e79772fdd5e7",
        "66168369fec2d53ea2d145f6",
        "66168371fec2d53ea2d14603",
        "6616b1385b4eeb13ea8c07ab"
    ],
    "__v": 4
}
```

---

### Récupérer les disponibilités d'une table (GET /tables/:tableId/availabilities)

Récupère les disponibilités d'une table spécifique en fonction de son identifiant.

### Filtres de recherche

Vous pouvez utiliser les paramètres de requête suivants pour filtrer les disponibilités :

- startTime (optionnel) : Filtre les disponibilités pour afficher uniquement celles qui commencent après ou au moment spécifié. Le format de date accepté est ISO 8601 (par exemple, "2024-08-31T03:40:00.000Z").

- endTime (optionnel) : Filtre les disponibilités pour afficher uniquement celles qui se terminent avant ou au moment spécifié. Le format de date accepté est également ISO 8601.

#### Exemple de requête

```json
GET /tables/661668a3d877e79772fdd5d6/availabilities?startTime=2024-04-14T19:00:00.000Z&endTime=2024-04-14T21:00:00.000Z
```

#### Réponse réussie

Code : 200 OK

```json
[
    {
        "_id": "661668efd877",
        "startTime": "2024-04-14T19:00:00.000Z",
        "endTime": "2024-04-14T20:00:00.000Z",
        "status": "available",
        "__v": 0
    },
    {
        "_id": "66168369fec2d53ea2d145f6",
        "startTime": "2024-04-14T20:00:00.000Z",
        "endTime": "2024-04-14T21:00:00.000Z",
        "status": "available",
        "__v": 0
    }
]
```



À venir...

---

