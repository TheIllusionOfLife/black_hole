.DEFAULT_GOAL := claude

# 1. Build and start the devcontainer
up:
	@echo "🚀 Building and running dev container..."
	@devcontainer up --workspace-folder .

# 2. Start Claude Code (new session)
claude: up
	@echo "🤖 Starting Claude Code (new session)..."
	@devcontainer exec --workspace-folder . -- \
		claude --dangerously-skip-permissions --verbose $(ARGS)

# 3. Continue previous session
continue: ARGS=-c
continue: claude

# 4. Pause the running devcontainer
pause:
	@echo "⏸ Pausing devcontainer..."
	@CONTAINER_ID=$$(docker ps -q -f "label=devcontainer.local_folder=$$(pwd)"); \
	if [ -n "$$CONTAINER_ID" ]; then \
		docker pause $$CONTAINER_ID; \
		echo "  > Paused container $$CONTAINER_ID."; \
	else \
		echo "  > No running devcontainer to pause."; \
	fi

# 5. Unpause the devcontainer
unpause:
	@echo "▶️ Unpausing devcontainer..."
	@CONTAINER_ID=$$(docker ps -q -f "label=devcontainer.local_folder=$$(pwd)"); \
	if [ -n "$$CONTAINER_ID" ]; then \
		docker unpause $$CONTAINER_ID; \
		echo "  > Unpaused container $$CONTAINER_ID."; \
	else \
		echo "  > No paused devcontainer to unpause."; \
	fi

# 6. Stop (exit) the devcontainer
stop:
	@echo "⏹ Stopping devcontainer..."
	@CONTAINER_ID=$$(docker ps -q -f "label=devcontainer.local_folder=$$(pwd)"); \
	if [ -n "$$CONTAINER_ID" ]; then \
		docker stop $$CONTAINER_ID; \
		echo "  > Stopped container $$CONTAINER_ID."; \
	else \
		echo "  > No running devcontainer to stop."; \
	fi

# 7. Remove the devcontainer
down:
	@echo "🗑 Removing devcontainer..."
	@CONTAINER_ID=$$(docker ps -aq -f "label=devcontainer.local_folder=$$(pwd)"); \
	if [ -n "$$CONTAINER_ID" ]; then \
		docker rm -f $$CONTAINER_ID; \
		echo "  > Removed container $$CONTAINER_ID."; \
	else \
		echo "  > No devcontainer to remove."; \
	fi

# 8. Rebuild from scratch (remove + up)
rebuild:
	@echo "♻️ Rebuilding devcontainer..."
	@$(MAKE) down
	@$(MAKE) up

# 9. Show status of devcontainer
status:
	@echo "ℹ️ Devcontainer status..."
	@docker ps -a --filter "label=devcontainer.local_folder=$$(pwd)"

# 10. Enter shell in devcontainer
shell:
	@echo "💻 Entering devcontainer shell..."
	@devcontainer exec --workspace-folder . -- zsh

.PHONY: up claude continue pause unpause stop down rebuild status shell
