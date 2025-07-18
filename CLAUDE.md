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

This is the "black_hole" repository. The project is currently in early setup phase and the specific implementation language has not been determined yet.

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
The project structure will be determined based on the chosen implementation language. The CI system will automatically detect and adapt to:
- Python projects (requirements.txt, setup.py, pyproject.toml)
- Node.js projects (package.json)
- Go projects (go.mod)
- Rust projects (Cargo.toml)
- Other languages as needed

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