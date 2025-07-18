/**
 * Main entry point for Singularity Shift game
 */

import { Game } from './game/Game';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const container = document.getElementById('game-container');
    if (!container) {
      throw new Error('Game container not found');
    }

    // Initialize the game
    const game = new Game(container);
    
    // Start the game
    await game.start();
  } catch (error) {
    console.error('Failed to start game:', error);
    // TODO: Display user-friendly error message in UI
  }
});