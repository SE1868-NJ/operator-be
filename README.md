# How to setup

This project is built using **Express.js**, **Sequelize ORM**, and **pnpm** for dependency management. It serves as a foundation for building robust web applications with a clean, structured codebase.

---

## Project structure

```

my-express-app/
├── config/
│   └── config.js                # Database and environment configuration
├── models/                      # Sequelize models
│   ├── index.js                 # Automatically imports all models
│   ├── user.model.js            # Example: User model
│   └── product.model.js         # Example: Product model
├── migrations/                  # Sequelize migrations
│   ├── 20231010123456-create-user.js
│   └── 20231010123457-create-product.js
├── seeders/                     # Sequelize seeders (optional)
│   └── 20231010123458-seed-users.js
├── controllers/                 # Controllers for handling business logic
│   ├── user.controller.js       # Example: User controller
│   └── product.controller.js    # Example: Product controller
├── routes/                      # Route definitions
│   ├── index.js                 # Main route file
│   ├── user.routes.js           # Example: User routes
│   └── product.routes.js        # Example: Product routes
├── middleware/                  # Custom middleware
│   └── auth.js                  # Example: Authentication middleware
├── services/                    # Business logic layer (optional)
│   ├── user.service.js          # Example: User service
│   └── product.service.js       # Example: Product service
├── utils/                       # Utility functions
│   └── helpers.js               # Example: Helper functions
├── public/                      # Static files (CSS, JS, images)
│   └── styles.css
├── views/                       # Templates (if using a view engine like EJS/Pug)
│   └── index.ejs
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Project dependencies
├── app.js                       # Main application file
└── server.js                    # Server entry point

```

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [pnpm](https://pnpm.io/) (v8 or later)
- A supported database system (MySQL).

## Getting Started

Follow these steps to get the project running on your local machine.

### Clone the Repository

```bash
git clone https://github.com/SE1868-NJ/operator-be
cd operator-be
```

### Install dependencies

```bash
pnpm install
```

... Create database, change db info in src/config/config.js
### Migrate database

```bash
pnpm migrate
```

### Start server

```bash
pnpm start
```
