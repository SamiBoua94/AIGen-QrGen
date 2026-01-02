# PhotoVerify - QR Photo Verification

Une application web locale pour sécuriser et vérifier l'authenticité de vos photos via QR Code.

## Fonctionnalités

- **Upload Direct** : Ajoutez des photos avec titre, date et description.
- **Génération Flash** : Crée automatiquement un QR code unique pour chaque image.
- **Vérification Public** : Page de vérification accessible via le QR pour prouver l'authenticité.
- **Gestion Galerie** : Visualisez toutes vos photos, téléchargez les QR codes ou supprimez les entrées.

## Installation

1. **Installer les dépendances** :
   ```bash
   npm install
   ```

2. **Configurer l'environnement** :
   Créez un fichier `.env` à la racine (déjà inclus si vous lancez localement) :
   ```env
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

4. **Accès** :
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Docker (Optionnel)

Pour lancer l'application avec Docker Compose :
```bash
docker-compose up --build
```

## Structure Technique

- **Frontend** : Next.js 14, Tailwind CSS, Lucide React.
- **Backend** : Next.js API Routes.
- **Base de données** : SQLite (via `sqlite3`).
- **QR Code** : Bibliothèque `qrcode`.
- **Stockage** : Dossier local `public/uploads`.
