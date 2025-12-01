# E-Commerce Web Application - Frontend

A modern, responsive Angular-based e-commerce frontend application that consumes microservices APIs for product and inventory management. This project is part of a complete microservices solution implementing the JSON:API specification.

## 📋 Table of Contents

- [Overview](#overview)
- [Technical Stack](#technical-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Integration](#api-integration)
- [Design Decisions](#design-decisions)
- [Backend Repositories](#backend-repositories)
- [Contributing](#contributing)

## 🎯 Overview

This Angular application serves as the frontend for a microservices-based e-commerce platform. It provides a complete user interface for managing products and inventory, implementing best practices for modern web development including:

- Clean, modular architecture with feature modules
- Reactive state management with RxJS
- Comprehensive error handling
- Loading states and user feedback
- Responsive design
- API key authentication
- JSON:API compliance

## 🛠 Technical Stack

- **Framework**: Angular 18.2.0
- **Language**: TypeScript 5.5.2
- **HTTP Client**: Angular HttpClient with RxJS 7.8.0
- **Routing**: Angular Router
- **Forms**: Angular Reactive Forms
- **Build Tool**: Angular CLI 18.2.19
- **CSS**: Pure CSS with modular component styles

## 🏗 Architecture

### Project Architecture

The application follows Angular's recommended architecture patterns with a clear separation of concerns:

```
src/app/
├── core/                    # Core module (singleton services, interceptors)
│   ├── interceptors/       # HTTP interceptors (API key, headers)
│   ├── models/             # Domain models and interfaces
│   └── services/           # Singleton services (ProductService, InventoryService)
├── features/               # Feature modules (lazy-loaded)
│   └── products/           # Products feature module
│       ├── components/     # Feature-specific components
│       ├── pages/          # Route components
│       └── products.module.ts
├── shared/                 # Shared module (components, directives, pipes)
│   └── components/         # Reusable components (header, sidebar, modals)
└── environments/           # Environment configuration files
```

### Communication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Angular Frontend                        │
│                     (Port: 4200)                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP Requests
                            │ (JSON:API Format)
                            │ (X-API-Key Header)
                            │
            ┌───────────────┴────────────────┐
            │                                 │
            ▼                                 ▼
┌──────────────────────┐          ┌─────────────────────┐
│  Products Service    │          │  Inventory Service  │
│   (Port: 8081)       │◄─────────┤   (Port: 8082)      │
│   Java Spring Boot   │          │   Java Spring Boot  │
│  - CRUD Operations   │          │  - Stock Management │
│  - Product Catalog   │          │  - Quantity Updates │
│  - Pagination        │          │  - Product Lookup   │
└──────────────────────┘          └─────────────────────┘
            │                                 │
            ▼                                 ▼
┌──────────────────────┐          ┌─────────────────────┐
│     MySQL DB         │          │     MySQL DB        │
│   (Products)         │          │   (Inventory)       │
└──────────────────────┘          └─────────────────────┘
```

## ✨ Features

### Product Management
- **List Products**: Display all products with pagination (configurable page size)
- **View Product Details**: Comprehensive product information display
- **Create Products**: Add new products to the catalog with validation
- **Update Products**: Edit existing product information
- **Delete Products**: Remove products from the catalog with confirmation
- **Search & Filter**: (Ready for implementation)

### Inventory Management
- **View Inventory**: Display current stock levels for each product
- **Create Inventory**: Initialize inventory for products
- **Update Quantity**: Adjust inventory levels with reason tracking
- **Purchase Simulation**: Decrease stock to simulate purchases
- **Real-time Updates**: Synchronize inventory changes across services

### User Experience
- **Responsive Design**: Mobile-first, adaptive layouts
- **Loading States**: Visual feedback during API operations
- **Error Handling**: User-friendly error messages with retry options
- **Confirmation Dialogs**: Prevent accidental destructive actions
- **Pagination**: Efficient navigation through large datasets
- **Empty States**: Helpful messages when no data is available

## 📁 Project Structure

```
e-commerce-web/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── interceptors/
│   │   │   │   └── api.interceptor.ts          # API key & headers interceptor
│   │   │   ├── models/
│   │   │   │   ├── product.model.ts            # Product interface
│   │   │   │   ├── inventory.model.ts          # Inventory interfaces
│   │   │   │   ├── api-response.model.ts       # JSON:API response types
│   │   │   │   └── index.ts                    # Models barrel export
│   │   │   └── services/
│   │   │       ├── product.service.ts          # Product API service
│   │   │       └── inventory.service.ts        # Inventory API service
│   │   ├── features/
│   │   │   ├── products/
│   │   │   │   ├── components/
│   │   │   │   │   ├── product-card/          # Product display card
│   │   │   │   │   ├── product-form/          # Create/Edit form
│   │   │   │   │   ├── product-filters/       # Filter controls
│   │   │   │   │   └── inventory-modal/       # Inventory management modal
│   │   │   │   ├── pages/
│   │   │   │   │   ├── products-list/         # Product list page
│   │   │   │   │   ├── product-detail/        # Product edit page
│   │   │   │   │   ├── product-view/          # Product view page
│   │   │   │   │   └── product-new/           # Create product page
│   │   │   │   ├── products-routing.module.ts
│   │   │   │   └── products.module.ts
│   │   │   ├── settings/
│   │   │   │   └── settings.component.ts      # Settings page
│   │   │   └── help/
│   │   │       └── help.component.ts          # Help page
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/                    # App header
│   │   │   │   ├── sidebar/                   # Navigation sidebar
│   │   │   │   ├── search-bar/                # Search component
│   │   │   │   └── confirm-modal/             # Confirmation dialog
│   │   │   └── shared.module.ts
│   │   ├── app-routing.module.ts              # Root routing
│   │   ├── app.component.ts                   # Root component
│   │   └── app.module.ts                      # Root module
│   ├── environments/
│   │   ├── environment.ts                     # Development config
│   │   └── environment.prod.ts                # Production config
│   ├── index.html                             # Main HTML file
│   ├── main.ts                                # Bootstrap file
│   └── styles.css                             # Global styles
├── public/                                     # Static assets
├── angular.json                                # Angular CLI configuration
├── package.json                                # Dependencies
├── tsconfig.json                               # TypeScript configuration
└── README.md                                   # This file
```

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher
- **Angular CLI**: v18.2.19 (install globally: `npm install -g @angular/cli`)
- **Git**: For version control

### Required Backend Services

This frontend requires two backend microservices to be running:

1. **Products Microservice** (Port 8081)
   - Repository: [Link to products-service repo]
   - Technology: Java Spring Boot
   - Database: MySQL
   - Manages product catalog (CRUD operations)

2. **Inventory Microservice** (Port 8082)
   - Repository: [Link to inventory-service repo]
   - Technology: Java Spring Boot
   - Database: MySQL
   - Manages product inventory and stock levels

> ⚠️ **Important**: Ensure both backend services are running before starting the frontend application.

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/JavierSantiagoSalazar/e-commerce-web.git
cd e-commerce-web
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Angular framework and CLI
- RxJS for reactive programming
- TypeScript compiler
- Testing frameworks (Jasmine, Karma)

## ⚙️ Configuration

### Environment Variables

The application uses environment files for configuration. Update these based on your backend setup:

**Development** (`src/environments/environment.ts`):
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',          // Products service URL
  inventoryApiUrl: 'http://localhost:8082', // Inventory service URL
  apiKey: 'mi-clave-secreta-2025'           // API key for authentication
};
```

**Production** (`src/environments/environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.yourcompany.com/products',
  inventoryApiUrl: 'https://api.yourcompany.com/inventory',
  apiKey: 'YOUR_PRODUCTION_API_KEY'
};
```

### API Configuration

The application automatically configures all HTTP requests through the `ApiInterceptor`:
- Adds `Accept: application/vnd.api+json` header
- Adds `Content-Type: application/vnd.api+json` for POST/PUT/PATCH
- Adds `x-api-key` header for authentication

## 🏃 Running the Application

### Development Server

Start the development server:

```bash
npm start
# or
ng serve
```

The application will be available at: **http://localhost:4200/**

The dev server features:
- Hot module replacement (auto-reload on changes)
- Source maps for debugging
- Detailed error messages

### Production Build

Build the application for production:

```bash
npm run build
# or
ng build --configuration production
```

Production builds include:
- Ahead-of-Time (AOT) compilation
- Tree-shaking and minification
- Optimized bundle sizes
- Hash-based cache busting

Build artifacts will be stored in `dist/e-commerce-app/`.

### Serve Production Build Locally

To test the production build locally:

```bash
# Install a simple HTTP server if you don't have one
npm install -g http-server

# Navigate to build directory and serve
cd dist/e-commerce-app
http-server -p 8080
```

## 🧪 Testing

### Running Tests

The project is configured with Jasmine and Karma for testing, base comes:

```bash
npm test
# or
ng test
```

### Future Improvements: Testing Implementation

> ⚠️ **Note**: Comprehensive testing is not yet implemented but is planned for future development.

The following testing strategy should be implemented:

#### **Unit Tests**
- **Component Tests**: Test component initialization, data binding, and user interactions
- **Service Tests**: Mock HTTP calls and test service methods
- **Pipe/Directive Tests**: Test custom pipes and directives
- **Model Tests**: Validate data models and interfaces

#### **Integration Tests**
- **API Integration**: Test communication with backend services
- **Error Handling**: Verify error scenarios and user feedback
- **Data Flow**: Test data flow between components and services
- **Authentication**: Test API key injection via interceptor

#### **E2E Tests**
- **User Workflows**: Complete user journeys (create, edit, delete products)
- **Navigation**: Test routing and lazy loading
- **Form Validation**: Test product and inventory forms
- **Pagination**: Test list navigation and data loading

#### **Recommended Testing Tools**
- **Jasmine**: Unit test framework (already configured)
- **Karma**: Test runner (already configured)
- **Testing Library**: Component testing utilities

#### **Coverage Goals**
- Minimum 80% code coverage for services
- Minimum 70% code coverage for components
- Critical path E2E tests for main workflows

#### **Test Execution Commands** (Once implemented)
```bash
# Run unit tests
ng test

# Run tests with coverage
ng test --code-coverage

# Run tests in headless mode (CI/CD)
ng test --watch=false --browsers=ChromeHeadless

# Run E2E tests
ng e2e
```

## 🔌 API Integration

### JSON:API Compliance

All API communications follow the [JSON:API specification](https://jsonapi.org/):

**Request Format:**
```typescript
// Headers
{
  "Accept": "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  "x-api-key": "mi-clave-secreta-2025"
}
```

**Response Format:**
```typescript
// Success Response
{
  "data": {
    "id": "1",
    "productName": "Product Name",
    "description": "Description",
    "price": 99.99,
    "category": "Electronics",
    "brand": "Brand Name",
    "imageUrl": "https://example.com/image.jpg"
  },
  "meta": {
    "currentPage": 0,
    "totalPages": 5,
    "totalElements": 50,
    "pageSize": 10
  }
}

// Error Response
{
  "errors": [
    {
      "status": "404",
      "title": "Not Found",
      "detail": "Product with ID 999 not found"
    }
  ]
}
```

### Products Service Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/product/` | List all products (with pagination) |
| GET | `/product/{id}` | Get product by ID |
| POST | `/product/` | Create new product |
| PUT | `/product/{id}` | Update product |
| DELETE | `/product/{id}` | Delete product |

**Pagination Parameters:**
- `page`: Page number (0-indexed)
- `size`: Items per page
- `sortBy`: Field to sort by
- `sortDirection`: ASC or DESC

### Inventory Service Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/inventory` | Create inventory for product |
| PUT | `/inventory/{id}/quantity` | Update inventory quantity |

### Error Handling

The application implements comprehensive error handling:

1. **Network Errors**: Connection failures, timeouts
2. **API Errors**: 4xx and 5xx responses
3. **Validation Errors**: Form validation feedback
4. **Business Logic Errors**: Domain-specific errors

Error Display Strategy:
- User-friendly messages in the UI
- Detailed logging in console for debugging
- Retry mechanisms for transient failures
- Graceful degradation when services are unavailable

## 🎨 Design Decisions

### 1. Architecture Choices

**Feature Modules with Lazy Loading**
- **Decision**: Implement lazy-loaded feature modules
- **Rationale**: Improves initial load time, better code organization, easier maintenance
- **Trade-off**: Slight complexity increase, minimal for this size project

**Core and Shared Modules**
- **Decision**: Separate core (singleton services) from shared (reusable components)
- **Rationale**: Follows Angular best practices, prevents multiple service instances
- **Benefits**: Clear dependency structure, reusability

### 2. State Management

**RxJS Observables without State Library**
- **Decision**: Use RxJS directly without NgRx/Akita
- **Rationale**: Application complexity doesn't justify a full state management library
- **Benefits**: Simpler code, less boilerplate, easier onboarding
- **Consideration**: Would add NgRx if app grows significantly

### 3. API Communication

**HTTP Interceptor Pattern**
- **Decision**: Centralize API configuration in interceptor
- **Rationale**: DRY principle, consistent headers, single point for auth
- **Benefits**: Easy to modify auth strategy, automatic header injection

**JSON:API Compliance**
- **Decision**: Strictly follow JSON:API specification
- **Rationale**: Standardization, better API contract, framework support
- **Benefits**: Predictable responses, easier debugging, industry standard

### 4. Component Design

**Smart/Presentational Component Pattern**
- **Decision**: Separate container (smart) from presentational (dumb) components
- **Rationale**: Better testability, reusability, clear responsibility
- **Example**: `ProductsListComponent` (smart) uses `ProductCardComponent` (presentational)

**Reactive Forms**
- **Decision**: Use reactive forms for product creation/editing
- **Rationale**: Better for dynamic forms, easier validation, testability
- **Benefits**: Type safety, reactive validation, programmatic control

### 5. Error Handling

**Multi-Layer Error Handling**
- **Decision**: Handle errors at service and component levels
- **Rationale**: Separation of concerns, flexible error presentation
- **Implementation**: 
  - Services: Log and transform errors
  - Components: Display user-friendly messages

### 6. Styling Approach

**Pure CSS (No Framework)**
- **Decision**: Avoid CSS frameworks (Bootstrap, Material, etc.)
- **Rationale**: Demonstrate CSS skills, full control, smaller bundle
- **Trade-off**: More manual work, but cleaner and custom design
- **Benefits**: No framework bloat, exact design control

### 7. TypeScript Configuration

**Strict Mode Enabled**
- **Decision**: Enable TypeScript strict mode
- **Rationale**: Catch more errors at compile time, better code quality
- **Benefits**: Type safety, fewer runtime errors, better IDE support

### 8. Security Considerations

**API Key Authentication**
- **Decision**: Use API key in headers (x-api-key)
- **Rationale**: Simple authentication for microservices
- **Production Note**: Should be replaced with JWT/OAuth for production
- **Current State**: Suitable for development/demo purposes

### 9. Local Storage for Inventory Persistence

**Decision**: Store inventory data in browser's localStorage
- **Context**: The Inventory microservice API design has a limitation - it only returns inventory data during creation (POST) but doesn't provide a GET endpoint to retrieve existing inventory by product ID
- **Problem**: Once inventory is created, there's no way to fetch it again from the API. Additionally, the service prevents creating duplicate inventory entries for the same product
- **Solution**: Cache inventory data in localStorage using the key pattern: `inventory_product_{productId}`
- **Implementation**: 
  - When inventory is created via POST, store the response in localStorage
  - When inventory is updated, update the localStorage entry
  - When a product is deleted, remove its associated inventory from localStorage
  - Display cached inventory data when viewing products
- **Trade-offs**:
  - ✅ **Pros**: Enables inventory display without API support, simple implementation, works offline
  - ❌ **Cons**: Data only persists in one browser, not synchronized across devices, can become stale if backend changes
- **Production Recommendation**: Ideally, the Inventory service should provide a `GET /inventory/product/{productId}` endpoint to fetch inventory by product ID. This would eliminate the need for client-side caching and ensure data consistency
- **Alternative Considered**: Could implement a client-side state management solution (like NgRx), but localStorage is sufficient given the API limitation

### 10. Performance Optimizations

**Implemented:**
- Lazy loading of feature modules
- OnPush change detection (where applicable)
- Pagination for large datasets
- Minimal re-renders with proper component lifecycle

**Future Improvements:**
- **Testing**: Implement comprehensive unit, integration, and E2E tests (see Testing section)
- Implement virtual scrolling for very large lists
- Add caching layer for frequently accessed data
- Implement service workers for offline capability

### 11. Accessibility

**Current Implementation:**
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Focus management in modals

**Future Improvements:**
- ARIA labels for screen readers
- Color contrast compliance (WCAG 2.1 AA)
- Keyboard shortcuts
- Accessibility testing automation

## 📦 Backend Repositories

This frontend application is part of a complete microservices solution. Backend repositories:

1. **Products Microservice**
   - Repository: [Add your products-service repository URL]
   - Technology: Java Spring Boot
   - Database: MySQL
   - Port: 8081
   - Features: CRUD operations, pagination, JSON:API compliance

2. **Inventory Microservice**
   - Repository: [Add your inventory-service repository URL]
   - Technology: Java Spring Boot
   - Database: MySQL
   - Port: 8082
   - Features: Stock management, product integration, event logging

## 📊 Technical Specifications

### Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### Performance Metrics

- Initial Load: < 3s
- Time to Interactive: < 5s
- First Contentful Paint: < 1.5s
- Lighthouse Score: > 90

## 🔧 Development Guidelines

### Code Style

- Follow Angular Style Guide
- Use TypeScript strict mode
- Implement proper error handling
- Write descriptive commit messages
- Document complex logic

### Component Guidelines

- Keep components focused and small
- Use OnPush change detection when possible
- Implement proper lifecycle hooks
- Unsubscribe from observables
- Use async pipe when possible

### Service Guidelines

- Keep services stateless
- Return observables, not promises
- Implement proper error handling
- Use dependency injection
- Document public methods

## 📧 Contact

**Developer**: Javier Santiago Salazar
**Repository**: https://github.com/JavierSantiagoSalazar/e-commerce-web