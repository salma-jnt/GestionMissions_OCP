# Gestion des missions — OCP Safi

Application web de gestion des missions des collaborateurs, réalisée dans le cadre d’un stage à OCP Safi.

Le projet vise à centraliser les missions, les collaborateurs et les véhicules, à visualiser les destinations sur une carte interactive et à générer des rapports de mission.

## Fonctionnalités

### Gestion des missions

- Création, consultation, modification et suppression des missions.
- Renseignement du titre, de la description, du lieu et des dates.
- Gestion du statut des missions.
- Filtres de consultation.
- Modules d’affectation d’un collaborateur et d’un véhicule.
- Contrôle de disponibilité du véhicule lors de la création d’une mission.

### Collaborateurs et véhicules

- Gestion des fiches collaborateurs.
- Gestion des véhicules.
- Consultation des informations associées aux missions.

### Authentification

- Inscription et connexion avec un nom d’utilisateur et un mot de passe.
- Authentification par jeton JWT.
- Encodage des mots de passe.
- Présence des rôles responsable et collaborateur dans le modèle.

Les restrictions d’accès par rôle et par mission restent à renforcer côté serveur.

### Cartographie

- Carte interactive avec Leaflet et OpenStreetMap.
- Affichage des missions à partir de leurs coordonnées géographiques.
- Fenêtres contextuelles présentant les informations des missions.
- Géocodage des lieux dans le formulaire de mission.


### Tableau de bord et rapports

- Indicateurs de suivi des missions.
- Consultation des missions récentes.
- Génération de rapports de mission au format PDF.
- Messages de confirmation et d’erreur dans l’interface.

## Technologies utilisées

| Partie | Technologies |
|---|---|
| Backend | Java 17, Spring Boot 3.5.3, Spring Web |
| Persistance | Spring Data JPA, PostgreSQL |
| Authentification | Spring Security, JWT |
| Frontend | React 18, JavaScript, Vite 7 |
| Navigation et API | React Router, Axios |
| Interface | Tailwind CSS, Bootstrap |
| Cartographie | Leaflet, React Leaflet, OpenStreetMap |
| Rapports PDF | iText HTML to PDF |
| Notifications visuelles | React Toastify |
| Construction | Maven Wrapper, npm |

## Organisation du projet

| Dossier | Contenu |
|---|---|
| `back/missions/missions/` | Application Spring Boot et configuration Maven |
| `back/missions/missions/src/main/java/com/ocp/missions/` | Contrôleurs, services, modèles, repositories et sécurité |
| `back/missions/missions/src/main/resources/` | Configuration du backend |
| `front/src/pages/` | Pages de l’application |
| `front/src/components/` | Formulaires, tableaux, modales et carte |
| `front/src/services/` | Services de communication avec le backend |
| `front/src/api/` | Configuration du client HTTP |

## Prérequis

- JDK 17.
- Node.js 22.12 ou supérieur et npm.
- PostgreSQL démarré localement.
- Accès Internet pour télécharger les dépendances et utiliser les services cartographiques.

Les scripts Maven Wrapper sont inclus dans le projet : une installation séparée de Maven n’est pas nécessaire.

## Installation et lancement

### 1. Récupérer le projet

Télécharger le ZIP du dépôt et l’extraire, ou utiliser Git :

```bash
git clone https://github.com/salma-jnt/GestionMissions_OCP.git
cd GestionMissions_OCP
```

### 2. Créer la base de données

Dans pgAdmin ou une session PostgreSQL :

```sql
CREATE DATABASE missions_ocp;
```

Utiliser une base dédiée au développement.

La configuration actuelle utilise :

```properties
spring.jpa.hibernate.ddl-auto=update
```

Hibernate peut donc modifier le schéma de cette base au démarrage.

### 3. Configurer la connexion PostgreSQL

Dans le fichier :

`back/missions/missions/src/main/resources/application.properties`

Remplacer les paramètres de connexion par :

```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/missions_ocp}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Conserver les autres paramètres nécessaires du fichier.

Les identifiants réels doivent être définis dans l’environnement local et ne pas être publiés dans le dépôt.

### 4. Lancer le backend

Depuis la racine du projet, sous Windows avec PowerShell :

```powershell
cd back/missions/missions

$env:DB_USERNAME="votre_utilisateur_postgresql"
$env:DB_PASSWORD="votre_mot_de_passe_local"

.\mvnw.cmd spring-boot:run
```

Sous Linux ou macOS :

```bash
cd back/missions/missions

export DB_USERNAME="votre_utilisateur_postgresql"
export DB_PASSWORD="votre_mot_de_passe_local"

sh ./mvnw spring-boot:run
```

Le backend utilise par défaut :

```text
http://localhost:8080
```

### 5. Lancer le frontend

Dans un second terminal, depuis la racine du projet :

```bash
cd front
npm ci
npm run dev
```

Ouvrir :

```text
http://localhost:5173
```

Si Vite utilise un autre port, adapter la configuration CORS du backend.

Les services frontend utilisent actuellement des adresses locales pointant vers le backend sur le port `8080`.

### 6. Compiler le frontend

Depuis le dossier `front` :

```bash
npm run build
```

Pour prévisualiser le résultat :

```bash
npm run preview
```

La prévisualisation du frontend ne démarre pas le backend.

## Principaux points d’entrée API

| Chemin | Usage |
|---|---|
| `/api/auth/register` | Inscription |
| `/api/auth/login` | Connexion |
| `/api/missions` | Gestion des missions |
| `/api/collaborateurs` | Gestion des collaborateurs |
| `/api/vehicules` | Gestion des véhicules |
| `/api/rapports/mission/{id}` | Génération du rapport PDF d’une mission |

Les requêtes protégées utilisent l’en-tête :

```http
Authorization: Bearer <token>
```


## Réalisation

**Salma Janati-Idrissi**  
