# TODO

## Tasks

- [ ] Authentication & Authorization

  - [x] Setup [Better-auth](https://www.better-auth.com) integration
    - [x] Install `better-auth` and configure base setup
    - [x] Setup environment variables for auth providers
    - [x] Create auth client instance
  - [ ] User Management
    - [ ] Extend user schema with role field (admin, user)
    - [ ] Implement email verification workflow
  - [x] Authentication Methods
    - [x] Setup email & password authentication
  - [ ] Auth UI
    - [x] Create sign in page
    - [x] Create sign up page
    - [ ] Create user password reset flow
    - [ ] Create user management page
    - [ ] Create user listing page
    - [ ] Create user creation page
    - [ ] Create user editing page

- [ ] API Layer with tRPC

  - [ ] Setup tRPC with TanStack React Query integration
    - [ ] Install required packages: `@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query`, `@tanstack/react-query`
    - [ ] Create tRPC router types for end-to-end typesafety
    - [ ] Choose and implement integration pattern:
      - [ ] Context-based pattern with `createTRPCContext` (for SSR support)
      - [ ] Singleton pattern with `createTRPCOptionsProxy` (for SPAs)
  - [ ] Configure tRPC client
    - [ ] Setup HTTP batch link for API communication
    - [ ] Configure QueryClient with appropriate defaults
    - [ ] Wrap application with `TRPCProvider`
  - [ ] Create tRPC routers
    - [ ] User router for profile management
    - [ ] Admin router with protected procedures
  - [ ] Implement auth integration
    - [ ] Create middleware for session validation
    - [ ] Add protected procedures using Better-auth session

- [ ] Data Tables & Dashboard Features
  - [ ] Implement Tanstack Table
    - [ ] Create reusable data table component with pagination
    - [ ] Add sorting and filtering capabilities
    - [ ] Create server-side data fetching hooks
  - [ ] Dashboard Enhancements
    - [ ] Convert dashboard navigation buttons to links
    - [ ] Add data visualization components with Recharts
    - [ ] Create dashboard analytics overview page
  - [ ] User Management Interface
    - [ ] Create user listing with CRUD operations
    - [ ] Implement role management UI

## Done

- [x] Setup shadcn/ui
  - [x] Setup a `shell` component
  - [x] Add all of the components
- [x] Setup drizzle-orm
  - [x] Setup drizzle-kit
  - [x] Install libsql client
- [x] **Setup a basic dashboard**
  - [x] dashboard layout
  - [x] dashboard page
  - [x] dashboard sidebar
  - [x] dashboard header
    - [x] Automatically generate the breadcrumbs
