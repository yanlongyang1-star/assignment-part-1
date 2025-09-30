# Project Version Relationship

**Student**: Yanlong Yang  
**Student No**: 22519263

## Version History

### Assignment 1: ltu-a1 (Basic Version)

**Repository**: `/Users/yangyanlong/Documents/ltu-a1`

**Features**:
- Basic Next.js application structure
- Navigation with tabs
- Pre-lab questions page
- Simple escape room placeholder
- Coding races page
- About page
- Basic routing

**Technologies**:
- Next.js 15
- TypeScript
- Basic CSS styling
- Simple component structure

---

### Assignment 2: cse3cwa-a2 (Enhanced Version)

**Repository**: `/Users/yangyanlong/Documents/ltu-a1/cse3cwa-a2`

**Relationship to Assignment 1**:
This project builds upon the concepts and structure learned in Assignment 1, but implements a completely new full-stack application with advanced features.

**Key Enhancements Over Assignment 1**:

#### 1. Full-Stack Features
- **Database**: Prisma ORM with SQLite (vs. no database in A1)
- **APIs**: RESTful CRUD endpoints (vs. no APIs in A1)
- **Data Models**: Room, Stage, Feedback models
- **Validation**: Zod schema validation

#### 2. Interactive Gameplay
- **Timer Component**: Real-time countdown (30 minutes)
- **3 Coding Challenges**:
  1. Format Code - Code formatting task
  2. Debug Code - Find and fix == vs === bug
  3. Loop Challenge - Write correct loop syntax
- **Progress Tracking**: Real-time progress bar
- **Game States**: Success/failure outcomes

#### 3. Advanced Technologies
- **Docker**: Multi-stage containerization
- **Testing**: Playwright E2E tests
- **Serverless**: AWS Lambda function
- **Monitoring**: Middleware logging, instrumentation
- **Performance**: Lighthouse & JMeter testing ready

#### 4. Enhanced UX
- **Theme Toggle**: Dark/Light mode with cookie persistence
- **Cookies**: Theme and last page tracking
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels, keyboard navigation
- **Professional UI**: Tailwind CSS styling

#### 5. DevOps & Deployment
- **Docker**: Production-ready containers
- **CI/CD Ready**: Deployment configurations
- **Cloud Deployment**: Vercel/AWS ready
- **Lambda Function**: Serverless HTML generator

---

## Migration from Assignment 1 to Assignment 2

### Concepts Retained
- Next.js App Router structure
- TypeScript usage
- Component-based architecture
- Page routing system

### New Implementations
- Complete rewrite with enhanced features
- Professional project structure
- Full-stack capabilities
- Production-ready code
- Comprehensive testing
- Docker containerization

### File Structure Comparison

**Assignment 1 (ltu-a1)**:
```
ltu-a1/
├── app/
│   ├── about/
│   ├── coding-races/
│   ├── escape-room/
│   ├── generators/
│   ├── prelab/
│   └── page.tsx
└── components/
```

**Assignment 2 (cse3cwa-a2)**:
```
cse3cwa-a2/
├── src/
│   ├── app/
│   │   ├── api/          # New: REST APIs
│   │   ├── escape/       # New: Full game
│   │   ├── about/        # Enhanced
│   │   └── ...
│   ├── components/       # New: Reusable components
│   ├── lib/              # New: Utilities
│   └── middleware.ts     # New: Logging
├── prisma/               # New: Database
├── tests/                # New: E2E tests
├── lambda/               # New: Serverless
└── Dockerfile            # New: Containerization
```

---

## Tag Relationship for GitHub

### Suggested Tags

When committing to GitHub, use these tags to show relationship:

```bash
# Assignment 1
git tag -a a1-final -m "Assignment 1: Basic web app structure"

# Assignment 2
git tag -a a2-enhanced -m "Assignment 2: Full-stack escape room game based on A1"
git tag -a a2-v1.0.0 -m "Assignment 2 v1.0.0: Complete implementation"
```

### GitHub README Badge

Add to top of README.md:

```markdown
[![Based on](https://img.shields.io/badge/Based%20on-Assignment%201-blue)](../ltu-a1)
[![Version](https://img.shields.io/badge/Version-A2%20v1.0.0-green)]()
[![Student](https://img.shields.io/badge/Student-22519263-orange)]()
```

---

## Summary

**Assignment 1** provided the foundation and learning experience with Next.js and TypeScript.

**Assignment 2** leverages that knowledge to build a production-ready, full-stack application with:
- ✅ Real database and APIs
- ✅ Interactive gameplay
- ✅ Professional testing
- ✅ Cloud deployment ready
- ✅ Industry-standard practices

**By**: Yanlong Yang (22519263)  
**Date**: September 2024
