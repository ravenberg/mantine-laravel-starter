
# Mantine Laravel Starter

A modern starter kit for Laravel applications powered by **Mantine UI v9**, **Inertia.js v3**, and **React 19**.

This kit combines the robust backend of Laravel 13 with the rich component library of Mantine, fully typed with TypeScript and optimized for the best developer experience.

## 🚀 Tech Stack

- **Backend:** Laravel 13 (PHP 8.4)
- **Frontend:** React 19 & Inertia.js v3
- **UI Components:** [Mantine UI v9](https://mantine.dev/)
- **Styling:** PostCSS with Mantine-presets & Lucide Icons
- **Build Tool:** Vite 8 with React Compiler support
- **Authentication:** Laravel Fortify (Pre-configured)
- **Testing:** Pest PHP 4
- **Routing:** Laravel Wayfinder (Type-safe routing for React)

## ✨ Key Features

- **Mantine v9 Integration:** Includes Notifications, Modals, Spotlight, and Form management out of the box.
- **React 19 Ready:** Leverages the latest React features and the new React Compiler.
- **Type Safety:** Enhanced with TypeScript 5.7 and Laravel Wayfinder for type-safe route generation.
- **Advanced Hooks:** Custom hooks like `use-flash-toast`, `use-appearance` (Dark Mode), and `use-two-factor-auth`.
- **Developer DX:** Pre-configured with Laravel Pail for logging, Laravel Pint for linting, and advanced Composer scripts.

## 🛠 Installation

### Option 1: Using Laravel Herd (Recommended)

If you use [Laravel Herd](https://herd.laravel.com), you can quickly create a new project using this repository as a template:
```
bash herd new my-app --template=https://github.com/ravenberg/mantine-laravel-starter
```

This will clone the repository, install dependencies, and set up your local `.test` domain automatically.

### Option 2: Manual Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ravenberg/mantine-laravel-starter.git
   cd mantine-laravel-starter
   ```

2. **Automatic Setup:**
   Run the setup script to install dependencies, generate keys, and migrate:
   ```bash
   composer setup
   ```

## 💻 Development

Start the full development environment (Server, Vite, Queue, and Logs) with a single command:

```bash
 composer dev
```

The application will be accessible at `http://localhost:8000` (or your Herd `.test` domain).

### Available Scripts

| Command | Description |
| :--- | :--- |
| `composer dev` | Runs server, vite, logs, and queue concurrently. |
| `npm run build` | Compiles frontend assets for production. |
| `composer lint` | Formats PHP code using Laravel Pint. |
| `npm run lint` | Checks and fixes JavaScript/TypeScript code. |
| `composer test` | Executes the Pest PHP test suite. |
| `npm run types:check` | Runs TypeScript type checking. |

## 📁 Project Structure

- `resources/js/components`: Reusable React components.
- `resources/js/hooks`: Custom React hooks (Mantine & Inertia helpers).
- `resources/js/pages`: Inertia page components.
- `resources/js/layouts`: Application layouts.
- `app/Actions/Fortify`: Authentication logic (Registration, 2FA, etc).

## 🛡 Security

This starter uses **Laravel Fortify** for authentication. Features like Two-Factor Authentication (TOTP), Email Verification, and Password Reset are fully integrated with Mantine UI components.

## 📄 License

The Mantine Laravel Starter is open-sourced software licensed under the [MIT license](LICENSE).
