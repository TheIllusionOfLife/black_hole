import Phaser from 'phaser';
import { PortalScene } from './PortalScene';

export class Game {
  private phaserGame: Phaser.Game;

  constructor(container: HTMLElement) {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 640,
      height: 480,
      parent: container,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
        },
      },
      scene: [PortalScene],
    };
    this.phaserGame = new Phaser.Game(config);
  }

  // phaser starts automatically when constructed
  async start(): Promise<void> {
    // no-op for now
    return Promise.resolve();
  }

  destroy(): void {
    this.phaserGame.destroy(true);
  }
}
