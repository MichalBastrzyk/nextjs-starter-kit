# TODO

## Tasks

### Authentication

- [ ] Authentication & Authorization

  - [x] Create user password reset flow
    - [ ] **Install react-emiail@v4 with tailwindcss**
    - [ ] Intetegrate a library for sending password reset emails.
  - [ ] Create user management page
  - [ ] Admin auth ui
    - [ ] Create user listing page
    - [ ] Create user creation page
    - [ ] Create user editing page
  - [ ] User Management
    - [ ] Extend user schema with role field (admin, user)
    - [ ] Implement email verification workflow

- [ ] Data Tables & Dashboard Features
  - [ ] Dashboard Enhancements
    - [x] Convert dashboard navigation buttons to links
    - [ ] Add data visualization components with Recharts
    - [ ] Create dashboard analytics overview page
  - [ ] User Management Interface
    - [ ] Create user listing with CRUD operations
    - [ ] Implement role management UI

## Done

- [x] Implement Tanstack Table
  - [x] Create reusable data table component with pagination
  - [x] Add sorting and filtering capabilities
  - [x] Use TRPC server side calls of the data fetching
- [x] Create sign in page
- [x] Create sign up page
- [x] Authentication Methods
  - [x] Setup email & password authentication
- [x] Setup [Better-auth](https://www.better-auth.com) integration
  - [x] Install `better-auth` and configure base setup
  - [x] Setup environment variables for auth providers
  - [x] Create auth client instance
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
- [x] API Layer with tRPC
  - [x] Setup tRPC with TanStack React Query integration
    - [x] Install required packages: `@trpc/server`, `@trpc/client`, `@trpc/react-query`, `@tanstack/react-query` and `superjson`
    - [x] Create tRPC router types for end-to-end typesafety
  - [x] Configure tRPC client
    - [x] Setup HTTP batch link for API communication
    - [x] Configure QueryClient with appropriate defaults
    - [x] Wrap application with `TRPCProvider`
  - [x] Implement auth integration
    - [x] Create middleware for session validation
    - [x] Add protected procedures using Better-auth session
