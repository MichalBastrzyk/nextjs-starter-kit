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
- 🔄 **React Hook Form** for forms
- 📝 **Zod** for validation
- 🎨 **Tailwind Animate** for animations
- 📱 **Mobile First** approach

## 🔜 Planned Features

- 🔐 **Better-Auth** for authentication

  - Secure authentication system
  - OAuth providers support
  - Session management
  - Protected routes

- 📧 **React Email** for email system

  - Beautiful email templates
  - Transactional emails
  - Email preview
  - Responsive design

- 🔄 **tRPC** for API integration

  - Type-safe API routes
  - Real-time capabilities
  - Automatic type inference
  - API documentation

- 📊 **shadcn-table** for data tables

  - Sortable columns
  - Filtering
  - Pagination
  - Row selection
  - Column resizing
  - Custom cell rendering

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages and layouts
├── components/       # Reusable UI components
├── lib/             # Utility functions and shared logic
├── server/          # Server-side code and API routes
├── config/          # Configuration files
└── env.js           # Environment variables validation
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/nextjs-starter-kit.git
   cd nextjs-starter-kit
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration.

4. **Start the development server**

   ```bash
   bun dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## 🛠️ Available Scripts

- `dev` - Start development server with Turbopack
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `lint:fix` - Fix ESLint issues
- `typecheck` - Run TypeScript compiler check
- `format:write` - Format code with Prettier
- `format:check` - Check code formatting

## 🎨 UI Components

This starter kit includes a comprehensive set of UI components from shadcn/ui, which are built on top of Radix UI primitives:

- Accordion
- Alert Dialog
- Avatar
- Button
- Calendar
- Card
- Checkbox
- Command (Command palette)
- Dialog
- Dropdown Menu
- Form
- Input
- Label
- Navigation Menu
- Popover
- Select
- Sheet
- Skeleton
- Slider
- Switch
- Table
- Tabs
- Textarea
- Toast
- Toggle
- Tooltip
- And many more...

## 📱 Responsive Design

The starter kit is built with a mobile-first approach and includes:

- Responsive layouts
- Mobile-friendly navigation
- Touch-friendly components
- Adaptive typography

## 📊 Database

Set up with Drizzle ORM for type-safe database operations:

- SQLite by default (easily switchable)
- Type-safe queries
- Migration support
- Schema validation

## 🎯 Best Practices

- TypeScript for type safety
- ESLint for code quality
- Prettier for consistent formatting
- Git hooks for pre-commit checks
- Environment variable validation
- Error handling
- Loading states
- Error boundaries

## 📚 Documentation

For more information about the technologies used in this starter kit:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [Better-Auth Documentation](https://www.better-auth.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
