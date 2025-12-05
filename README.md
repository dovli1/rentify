# 🏠 Rentify - SaaS de gestion de colocation

## 📝 Description
Application SaaS destinée aux propriétaires pour gérer leurs propriétés en colocation.

## 👥 Équipe
- **Backend (Laravel)** : [Votre nom]
- **Frontend (React/Vue/Angular)** : [Nom de votre ami]

## 🛠️ Technologies

### Backend
- Laravel 10+
- MySQL/PostgreSQL
- JWT Authentication
- API REST

### Frontend
- React/Vue/Angular (à définir)
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

## 🚀 Installation

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

## 📋 Fonctionnalités

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

## 🌿 Branches Git
- `main` : Production
- `develop` : Développement
- `feature/auth-backend` : Module authentification (backend)
- `feature/properties-backend` : Module propriétés (backend)

## 📞 Contact
Projet réalisé dans le cadre du stage de fin d'études.