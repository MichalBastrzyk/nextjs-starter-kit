# Next.js Starter Kit

A modern, production-ready Next.js starter kit with everything you need to build fast, beautiful, and responsive web applications.

## 🚀 Features

- ⚡️ **Next.js 15** with App Router
- 🎨 **Tailwind CSS** for styling
- 📦 **TypeScript** for type safety
- 🎯 **ESLint** & **Prettier** for code quality
- 📱 **Responsive** design
- 🎨 **shadcn/ui** components
- 📊 **Drizzle ORM** for database
- 🔐 **Better-Auth** for authentication with **role-based permissions** with type-safe checks
- 📧 **React Email** for email system with **Mailpit** for local email testing
- ☁️ **LocalStack** for local AWS service testing (e.g., S3)
- 🔒 **next-safe-action** for type-safe server actions
- 📊 **shadcn-table** for data tables
- 🔄 **React Hook Form** for forms
- 📝 **Zod** for validation
- 🎨 **Tailwind Animate** for animations
- 📱 **Mobile First** approach
- 🧪 **Playwright** for E2E testing

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages and layouts
├── components/          # Reusable UI components
├── config/              # Configuration files
├── emails/              # Email templates using React Email
├── lib/                 # Utility functions and shared logic
├── server/              # Server-side code (DB, Auth, API logic)
└── env.js               # Environment variables validation
e2e/                     # End-to-end tests with Playwright
├── auth/                # Authentication-related tests
├── navigation/          # Navigation flow tests
├── fixtures/            # Test fixtures and helpers
└── utils/               # Test utilities
temp/                    # Temporary files and folder
├── localstack/          # LocalStack configuration for AWS services
├── mailpit/             # Mailpit configuration for local email testing
├── playwright-report/   # Playwright test reports
└── playwright-results/  # Playwright test results
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nextjs-starter-kit.git
   cd nextjs-starter-kit
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Edit `.env` with your configuration.

4. **Start the development server and Docker services**

   The `docker-compose.yml` includes services like Mailpit for email testing and LocalStack for emulating AWS services (like S3) locally.

   ```bash
   docker-compose up -d  # Start Mailpit, LocalStack, and other services
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

6. **For email testing, access Mailpit at [http://localhost:8025](http://localhost:8025)**

## 🛠️ Available Scripts

- `dev` - Start development server with Turbopack
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `lint:fix` - Fix ESLint issues
- `typecheck` - Run TypeScript compiler check
- `format:write` - Format code with Prettier
- `format:check` - Check code formatting
- `db:push` - Push schema changes to the database (SQLite)
- `db:generate` - Generate DB migration files
- `db:migrate` - Apply DB migrations
- `db:studio` - Open Drizzle Studio GUI
- `email:dev` - Start React Email development server
- `test:e2e` - Run Playwright E2E tests
- `test:e2e:ui` - Run Playwright tests with UI mode

## 📚 Documentation

For more information about the technologies used in this starter kit:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Better-Auth Documentation](https://www.better-auth.com/)
- [next-safe-action Documentation](https://next-safe-action.dev/docs/getting-started)
- [Mailpit Documentation](https://github.com/axllent/mailpit)
- [Playwright Documentation](https://playwright.dev/docs/intro)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
