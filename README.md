# 🏠 Rentify - SaaS de gestion de colocation

##  Description
Application SaaS destinée aux propriétaires pour gérer leurs propriétés en colocation.

## Équipe
- **Backend (Laravel)** : dalal
- **Frontend (React):dina
- ** test : amina
## 🛠️ Technologies

### Backend
- Laravel 10+
- MySQL
- JWT Authentication
- API REST

### Frontend
- React
- Axios
- TailwindCSS

## 📁 Structure du projet
```
rentify/
├── backend/     # API Laravel
├── frontend/    # Interface utilisateur
├── .gitignore
└── README.md
```

##  Installation

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Fonctionnalités

### Module Authentification
- ✅ Inscription
- ✅ Connexion
- ✅ Déconnexion
- ✅ JWT Token
- ✅ Middleware Auth

### Module Gestion des Propriétés
- ✅ Créer une propriété
- ✅ Lister les propriétés
- ✅ Modifier une propriété
- ✅ Supprimer une propriété
- ✅ Upload de photos

##  Branches Git
- `main` : Production
- `develop` : Développement
- `feature/auth-backend` : Module authentification (backend)
- `feature/properties-backend` : Module propriétés (backend)

