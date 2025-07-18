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

This is the "black_hole" repository, which appears to be a Python-based project focused on idea generation and evaluation using AI agents. The project is currently in early setup phase.

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

### Python Project Structure (expected based on CI)
- Python versions: 3.10, 3.11, 3.12, 3.13 supported
- Dependencies: `config/requirements.txt`
- Source code: `src/` directory
- Package structure: `src/madspark/` with the following modules:
  - `agents/` - AI agent implementations (idea_generator, critic, advocate, skeptic)
  - `core/` - Core functionality (coordinator module)
  - `utils/` - Utility functions and constants

### Common Development Commands

```bash
# Install dependencies
python -m pip install --upgrade pip
pip install -r config/requirements.txt

# Linting
ruff check src/

# Type checking
mypy src/

# Run tests with proper PYTHONPATH
PYTHONPATH=src python -m pytest

# Security scan
bandit -r src/ -f json

# Quick syntax check
python -m py_compile src/madspark/core/coordinator.py
python -m py_compile src/madspark/agents/*.py
```

## CI/CD Configuration

### GitHub Actions Workflows

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Runs on push to main and pull requests
   - Matrix testing across Python 3.10, 3.11, 3.12, 3.13
   - Includes:
     - Dependency installation with caching
     - Linting with ruff (continues on error)
     - Type checking with mypy (continues on error)
     - Import testing for all agent modules
     - Mock testing with pytest
     - Security scanning with bandit
     - Project structure validation

2. **Code Review Workflows**:
   - `claude-code-review.yml` - Automated code review using Claude
   - `claude.yml` - Additional Claude-based automation
   - Gemini code review (`.gemini/config.yaml`):
     - Enabled with MEDIUM severity threshold
     - Triggers on pull request opens

### Before Committing Checklist
1. Ensure proper project structure exists
2. Run linting: `ruff check src/`
3. Run type checking: `mypy src/`
4. Run tests: `PYTHONPATH=src python -m pytest`
5. Check security: `bandit -r src/ -f json`

## Architecture Notes

### Agent-Based System
The codebase implements an agent-based architecture for idea generation and evaluation:
- **idea_generator**: Generates ideas with `build_generation_prompt()` and `generate_ideas()`
- **critic**: Evaluates ideas with `evaluate_ideas()`
- **advocate**: Advocates for ideas with `advocate_idea()`
- **skeptic**: Provides criticism with `criticize_idea()`
- **coordinator**: Orchestrates agent interactions (in `core/`)

### Key Implementation Details
- Uses Google GenAI dependencies (may not be available in CI)
- Constants defined in `utils/constants.py` (e.g., `IDEA_GENERATION_INSTRUCTION`)
- Test imports should handle missing dependencies gracefully
- CI tests use mocking to avoid external API calls

### Code Review
- Gemini code review is automatically triggered on PR creation
- Keep severity threshold at MEDIUM or above
- Address all review comments before merging