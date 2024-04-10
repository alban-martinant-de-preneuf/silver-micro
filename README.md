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

## Restaurants

À venir...

## Tables

À venir...

---

