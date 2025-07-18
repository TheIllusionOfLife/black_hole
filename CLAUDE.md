# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Development Principles

This codebase follows these principles:

- **KISS (Keep It Simple, Stupid)** - Simplicity in design and implementation
- **DRY (Don't Repeat Yourself)** - Avoid code duplication
- **YAGNI (You Ain't Gonna Need It)** - Only implement what's needed
- **SOLID** - Follow SOLID principles for object-oriented design
- **Separation of Concerns** - Each component should have a single, well-defined purpose
- **High Cohesion, Low Coupling** - Components should be internally coherent but loosely connected
- **Principle of Least Astonishment** - Code should behave as expected
- **Law of Demeter** - Components should only talk to their immediate friends
- **Test-Driven Development (TDD)** - Write tests first, then implementation
- **Boy-Scout Rule** - Leave the code cleaner than you found it with every commit

## Project Overview

This is the "black_hole" repository for **Singularity Shift** - a black hole-themed 3D puzzle game where players manipulate spacetime to solve puzzles. The game is being developed in TypeScript and will use either Babylon.js (for 3D) or Phaser (primarily 2D, with 3D support coming in v4).

## Development Environment

### Devcontainer Setup
The project uses a devcontainer for consistent development environments:

```bash
# Build and start devcontainer
make up

# Start Claude Code (new session)
make claude

# Continue previous Claude Code session
make continue

# Enter devcontainer shell
make shell

# Show devcontainer status
make status

# Stop devcontainer
make stop

# Remove devcontainer
make down

# Rebuild devcontainer from scratch
make rebuild
```

### Project Structure
```
black_hole/
├── src/
│   ├── game/         # Core game logic
│   │   └── Game.ts   # Main game class
│   ├── utils/        # Utility functions
│   ├── assets/       # Asset management
│   ├── types/        # TypeScript type definitions
│   └── main.ts       # Entry point
├── public/           # Static assets
├── dist/             # Build output (git-ignored)
├── index.html        # Main HTML file
├── package.json      # Node dependencies
├── tsconfig.json     # TypeScript configuration
├── vite.config.ts    # Vite build configuration
└── .eslintrc.json    # ESLint configuration
```

### Common Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Preview production build
npm run preview
```

### Game Engine Setup
The project is configured to work with either:
- **Babylon.js** - For full 3D implementation
- **Phaser** - For 2D or hybrid 2D/3D implementation

To add your chosen engine:
```bash
# For Babylon.js
npm install @babylonjs/core @babylonjs/gui @babylonjs/loaders

# For Phaser
npm install phaser
```

## CI/CD Configuration

### GitHub Actions Workflows

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Runs on push to main and pull requests
   - Language-agnostic checks:
     - Repository structure validation
     - Documentation presence check
     - Automatic language detection
   - Conditional language-specific checks based on file presence
   - Security scanning for potential secrets

2. **Code Review Workflows**:
   - `claude-code-review.yml` - Automated code review using Claude
   - `claude.yml` - Additional Claude-based automation
   - Gemini code review (`.gemini/config.yaml`):
     - Enabled with MEDIUM severity threshold
     - Triggers on pull request opens

### Code Review
- Gemini code review is automatically triggered on PR creation
- Keep severity threshold at MEDIUM or above
- Address all review comments before merging