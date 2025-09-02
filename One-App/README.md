<!-- markdownlint-disable -->
# OnPager - Next.js Application

A modern, unified OnPager application built with Next.js 15, React 19, and TypeScript, featuring a comprehensive admin panel with Material Design toggle switches for feature management.

## 🚀 Features

### Core Application
- **Next.js 15.5.2** with App Router architecture
- **React 19** with modern hooks and patterns
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS 3.4.0** for responsive, utility-first styling
- **SQLite database** for persistent feature state storage

### Feature Toggle System
- **Material Design Toggle Switches** - Beautiful, accessible toggle controls
- **Real-time Feature Control** - Toggle features on/off from admin panel
- **Persistent Storage** - Feature states saved to database
- **Category Organization** - Features organized by type (UI, Performance, Debug, Content, Navigation)
- **Live Preview** - See feature changes in real-time

### Available Features
- **Construction Lines** - Grid borders and layout guides
- **Grid Overlay** - CSS grid structure visualization
- **Element Highlighting** - Interactive element highlighting
- **Performance Mode** - Rendering optimizations
- **Lazy Loading** - Image and content lazy loading
- **Debug Logs** - Console logging for development
- **Performance Metrics** - Performance overlay display
- **Dark Mode** - Theme switching
- **Animations** - Smooth transitions and animations
- **Breadcrumbs** - Navigation breadcrumbs
- **Search Suggestions** - Autocomplete and search features

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- SQLite3

### Installation
```bash
# Clone the repository
cd One-App

# Install dependencies
npm install

# Initialize the database
npm run dev
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── admin/            # Admin panel pages
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── FeatureToggle.tsx # Material Design toggle switch
│   ├── MenuBar.tsx       # Navigation component
│   └── LanguageSelector.tsx
├── contexts/              # React contexts
│   └── FeatureContext.tsx # Feature state management
├── lib/                   # Utility libraries
│   └── database.ts       # SQLite database operations
└── types/                 # TypeScript type definitions
    └── features.ts       # Feature-related types
```

### Key Components

#### FeatureToggle Component
A Material Design toggle switch component with:
- Multiple color themes (blue, green, purple, orange, indigo, red)
- Accessibility features (ARIA labels, keyboard navigation)
- Smooth animations and hover effects
- Status indicators (ON/OFF badges)

#### FeatureContext
React context for managing feature states:
- Centralized feature state management
- Database persistence
- Real-time updates
- Category-based organization

#### Database Layer
SQLite-based persistence with:
- Automatic table creation
- Feature state storage
- Batch operations support
- Error handling and logging

## 🎨 Material Design Toggle Switches

The admin panel features beautiful Material Design toggle switches that:
- Use proper Material Design principles
- Include smooth animations and transitions
- Provide visual feedback for all states
- Support keyboard navigation
- Are fully accessible

### Toggle Switch Features
- **Track**: Rounded rectangle with gradient background when enabled
- **Thumb**: Circular control that slides smoothly
- **Colors**: Theme-based color schemes for different feature types
- **States**: Clear visual indicators for enabled/disabled states
- **Animations**: Smooth transitions with proper easing

## 🔧 API Endpoints

### GET /api/debug-options
Retrieves all feature states from the database.

### POST /api/debug-options/update
Updates a specific feature state.

**Request Body:**
```json
{
  "value": "feature-id",
  "settings": "true"
}
```

## 🎯 Feature Categories

### UI Features
- Construction Lines
- Grid Overlay
- Element Highlighting

### Performance Features
- Performance Mode
- Lazy Loading

### Debug Features
- Debug Logs
- Performance Metrics

### Content Features
- Dark Mode
- Animations

### Navigation Features
- Breadcrumbs
- Search Suggestions

## 🚀 Getting Started

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Access the main application:**
   - Open [http://localhost:3000](http://localhost:3000)

3. **Access the admin panel:**
   - Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)

4. **Toggle features:**
   - Use the Material Design toggle switches in the admin panel
   - See changes reflected in real-time on the main application

## 🔒 Security Considerations

- Admin routes are protected with custom headers
- Database operations are properly sanitized
- API endpoints include proper error handling
- Feature states are validated before storage

## 🧪 Testing

The application includes:
- TypeScript compilation checks
- ESLint configuration
- Proper error boundaries
- Loading and error states

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly toggle switches
- Adaptive admin panel layout

## 🌟 Future Enhancements

- User authentication and authorization
- Feature usage analytics
- A/B testing capabilities
- Feature rollback functionality
- Bulk feature operations
- Feature dependency management

## 🤝 Contributing

1. Ensure TypeScript compilation passes: `npm run type-check`
2. Follow the established code patterns
3. Add proper type definitions for new features
4. Test feature toggles in both admin and main app

## 📄 License

ISC License - see package.json for details

---

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS
