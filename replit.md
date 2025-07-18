# ManYao Li Personal Website

## Overview

This is a modern, responsive personal website for ManYao Li, a Statistics student at Beijing Normal University specializing in Data Science and Natural Language Processing. The site is built as a static personal portfolio showcasing academic background, research projects, and professional experience to attract data science job opportunities.

**Status**: ✅ Ready for GitHub Pages deployment with complete static build files, automated CI/CD workflow, and integrated AI chatbot.

### Recent Updates (July 18, 2025)
- ✅ Replaced Mendable with custom Perplexity AI chatbot integration
- ✅ Created dual chat interfaces: search bar and floating button
- ✅ Built backend API endpoint (/api/chat) for AI responses
- ✅ Implemented error handling and loading states
- ✅ Added context-aware responses about ManYao Li's background
- ✅ Updated professional photo to latest version

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Design System**: Morandi color palette for a professional, clean aesthetic
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for server bundling

### Component Structure
- Modular component architecture with reusable UI components
- Section-based layout (Hero, About, Projects, Resume, Contact, Footer)
- Custom hooks for scroll animations and responsive behavior
- Form handling with react-hook-form and zod validation

## Key Components

### UI Components
- **shadcn/ui**: Complete UI component library (buttons, forms, dialogs, etc.)
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library for consistent iconography
- **Custom Components**: Navigation, section components, and page layouts

### Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **Zod**: Type-safe schema validation

### Styling and Design
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS Variables**: Morandi color palette implementation
- **Responsive Design**: Mobile-first approach with breakpoint considerations
- **Inter Font**: Modern, readable typography

## Data Flow

### Static Content Flow
1. Content is statically defined within React components
2. Scroll animations trigger visibility states using Intersection Observer
3. Form submissions simulate API calls (ready for backend integration)
4. Navigation uses smooth scrolling between sections

### State Management
- Local component state for UI interactions
- Form state managed by react-hook-form
- Scroll animation states managed by custom hooks
- Toast notifications for user feedback

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, TypeScript
- **UI Framework**: shadcn/ui, Radix UI primitives
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Forms**: react-hook-form, @hookform/resolvers, zod
- **Icons**: Lucide React
- **Animations**: CSS transitions and Intersection Observer API

### Development Dependencies
- **Build Tools**: Vite, esbuild, tsx
- **Database**: Drizzle ORM with PostgreSQL support (configured but not actively used)
- **Routing**: Wouter for lightweight routing

### Database Schema
- Drizzle ORM configured with PostgreSQL
- Basic user schema defined but not utilized in current static implementation
- Schema location: `shared/schema.ts`
- Migration support available via `drizzle-kit`

## Deployment Strategy

### Development
- Vite dev server with HMR (Hot Module Replacement)
- Express server for API endpoints (currently minimal)
- TypeScript compilation and type checking
- Replit-specific development tools and banners

### Production Build
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Assets**: Static assets served from build directory
4. **Server**: Node.js production server serves both static files and API

### Environment Configuration
- Development: NODE_ENV=development with tsx
- Production: NODE_ENV=production with compiled JavaScript
- Database: PostgreSQL connection via DATABASE_URL environment variable
- Replit integration with development banners and cartographer

### Key Architectural Decisions

1. **Static-First Approach**: Content is embedded in components rather than fetched from APIs, ensuring fast load times and eliminating database dependencies for core functionality.

2. **Morandi Design Language**: Custom CSS variables implement a sophisticated color palette that appeals to professional audiences while maintaining accessibility.

3. **Component Modularity**: Each page section is a separate component, making content updates and maintenance straightforward.

4. **Progressive Enhancement**: Database and API infrastructure is configured but not required, allowing for future dynamic features without architectural changes.

5. **Performance Optimization**: Vite's build optimization, lazy loading via Intersection Observer, and minimal JavaScript ensure fast page loads.

6. **Responsive Design**: Mobile-first Tailwind approach ensures the site works well across all device sizes, crucial for recruiting scenarios.