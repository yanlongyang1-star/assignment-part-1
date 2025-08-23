# Assignment 1 – Tab Generator Website

A modern, accessible web application built with Next.js and Bootstrap for creating and managing HTML tab structures with localStorage persistence.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## ✨ Features

### Core Components
- **Header/Footer**: Responsive navigation with student information
- **Navigation Bar**: Desktop horizontal menu with mobile hamburger menu
- **Theme System**: Light/Dark mode toggle with persistent storage
- **Hamburger Menu**: CSS Transform animations with smooth transitions
- **Tabs Generator**: Create and manage up to 15 tabs with localStorage persistence
- **Output Generation**: Pure HTML + inline CSS output (no external dependencies)

### Technical Stack
- **Frontend**: Next.js 15 + React 19 + TypeScript
- **Styling**: Bootstrap 5 + Custom CSS
- **State Management**: React Hooks + localStorage
- **Build Tool**: Turbopack for fast development

## 🎯 Tabs Generator Usage

### Step-by-Step Guide

1. **Navigate to Tabs Generator**
   - Click "Tabs" in the navigation menu
   - Or visit `/generators/tabs` directly

2. **Add New Tabs**
   - Click the "＋ Add Step" button to create new tab entries
   - Each tab can have multiple content lines

3. **Edit Tab Content**
   - Click on tab titles to edit them
   - Modify content lines by clicking on the input fields
   - All changes are automatically saved to localStorage

4. **Remove Tabs**
   - Use the "✕" button next to each tab to remove it
   - The system prevents removing all tabs (maintains at least one)

5. **Generate Output**
   - Copy the generated HTML code
   - Save as `Hello.html` file
   - Double-click to run (pure HTML + JavaScript, no dependencies)

### Screenshots
*[Screenshots will be added here showing the tabs generator interface]*

## 🎥 Demo Video

The demonstration video is available in the About page and shows:
- Adding and removing tabs
- Editing tab titles and content
- localStorage persistence
- Output generation for 1, 3, or 5 tabs

**File Location**: `public/demo.mp4`
**About Page**: Visit `/about` to see the video with detailed descriptions

## ♿ Accessibility Features

### ARIA Implementation
- **Header Navigation**: `role="menubar"`, `role="menuitem"`
- **Hamburger Menu**: `aria-label`, `aria-expanded`, `aria-controls`
- **Tabs Interface**: `role="tablist"`, `role="tab"`, `role="tabpanel"`
- **Form Elements**: Proper `aria-label` attributes

### Keyboard Navigation
- **Tab Navigation**: Use Tab key to navigate between elements
- **Button Activation**: Enter/Space to activate buttons
- **Tab Switching**: Left/Right arrow keys to switch between tabs
- **Menu Control**: Escape key to close mobile menu

### Focus Management
- **Visible Focus**: 2px solid outline with 2px offset
- **Focus Trapping**: Proper focus management in modals and menus
- **Focus Return**: Focus returns to trigger element after actions

### Contrast & Visual Design
- **High Contrast**: Text contrast ratio ≥ 4.5:1 (WCAG AA compliant)
- **Theme Support**: Light and dark themes with maintained contrast
- **Visual Indicators**: Clear hover states and active indicators

## 🏗️ Project Structure

```
ltu-a1/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Header/Footer
│   ├── page.tsx                 # Homepage
│   ├── about/                   # About page with demo video
│   ├── generators/              # Generator tools
│   │   └── tabs/               # Tabs generator
│   │       ├── page.tsx        # Route page
│   │       └── ClientTabsPage.tsx # Main component
│   ├── prelab/                  # Pre-lab questions
│   ├── escape-room/             # Escape room challenge
│   └── coding-races/            # Coding races
├── components/                   # Reusable components
│   ├── Header.tsx              # Navigation header
│   ├── ThemeToggle.tsx         # Theme switcher
│   └── ThemeBoot.tsx           # Bootstrap JS loader
├── public/                      # Static assets
│   ├── demo.mp4                # Demo video
│   └── README.md               # Asset documentation
├── app/globals.css             # Global styles
└── package.json                # Dependencies
```

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Key Technologies
- **Next.js 15**: App Router, Server Components, Turbopack
- **React 19**: Latest React features and hooks
- **Bootstrap 5**: Responsive design and components
- **TypeScript**: Type safety and better development experience

## 📝 Repository Guidelines

### Branch Strategy
- **Main Branch**: Production-ready code
- **Feature Branches**: Create separate branches for each feature
- **Naming Convention**: `feature/description` or `fix/description`

### Commit Standards
- **Multiple Commits**: Make frequent, meaningful commits
- **Commit Messages**: Use clear, descriptive commit messages
- **Atomic Changes**: Each commit should represent one logical change

### Files to Exclude
The following files and directories should NOT be committed:
- `node_modules/` - Dependencies (install with npm install)
- `.next/` - Next.js build output
- `dist/` - Distribution files
- `.DS_Store` - macOS system files

## 🎓 Assignment Details

**Student**: Yanlongyang  
**Student Number**: 22519263  
**Course**: CSE3CWA / CSE5006  
**University**: La Trobe University  
**Date**: 2025-08-19

## 📚 Learning Outcomes

This project demonstrates:
- Modern web development with Next.js and React
- Responsive design principles with Bootstrap
- Accessibility implementation (WCAG 2.1 AA)
- State management and localStorage persistence
- CSS animations and transitions
- TypeScript for type safety
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of the LTU Assignment 1 requirements.
