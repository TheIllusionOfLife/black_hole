# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Core Development Principles

Based on the imported configuration from the Eureka project, this codebase follows these principles:

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

This is the "black_hole" repository, currently being set up with development configurations imported from the Eureka project. The project uses Apache License 2.0.

## Development Setup

### Python Project Structure (based on CI configuration)
The CI workflow suggests this is a Python project with:
- Python versions: 3.10, 3.11, 3.12, 3.13 supported
- Dependencies: Listed in `config/requirements.txt`
- Source code: Located in `src/` directory
- Package structure: `src/madspark/` with agents and core modules

### Common Commands

```bash
# Install dependencies
python -m pip install --upgrade pip
pip install -r config/requirements.txt

# Linting
ruff check src/

# Type checking
mypy src/

# Run tests
PYTHONPATH=src python -m pytest

# Security scan
bandit -r src/ -f json
```

## CI/CD Configuration

The project includes GitHub Actions workflows:

1. **CI Workflow** (`ci.yml`):
   - Runs on push to main and pull requests
   - Tests across multiple Python versions
   - Includes linting, type checking, and security scanning
   - Validates project structure

2. **Code Review Workflows**:
   - `claude-code-review.yml` - Automated code review
   - `claude.yml` - Additional Claude-based automation

3. **Gemini Configuration**:
   - Code review enabled with MEDIUM severity threshold
   - Reviews triggered on pull request opens

## Architecture

When implementing features in this project:

1. **Maintain Clear Separation** - Keep different concerns in separate modules
2. **Follow TDD** - Write tests before implementation
3. **Keep Main Branch Green** - Ensure CI passes before merging
4. **Use Proper Validation** - Defend against invalid inputs
5. **Apply Least Privilege** - Run with minimal required permissions

## Common Tasks

### Before Committing
1. Run linting: `ruff check src/`
2. Run type checking: `mypy src/`
3. Run tests: `PYTHONPATH=src python -m pytest`
4. Ensure CI will pass

### Code Review
- Gemini code review is automatically triggered on PR creation
- Keep severity threshold at MEDIUM or above
- Address all review comments before merging