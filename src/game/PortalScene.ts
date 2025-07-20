import Phaser from 'phaser';

const TILE_SIZE = 32;
const MAP_WIDTH = 10;
const MAP_HEIGHT = 10;

export class PortalScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private portalA?: Phaser.GameObjects.Rectangle;
  private portalB?: Phaser.GameObjects.Rectangle;
  private goal!: Phaser.GameObjects.Rectangle;

  constructor() {
    super('PortalScene');
  }

  create(): void {
    this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;

    const walls = this.physics.add.staticGroup();
    for (let x = 0; x < MAP_WIDTH; x++) {
      for (let y = 0; y < MAP_HEIGHT; y++) {
        if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
          const wall = this.add.rectangle(
            x * TILE_SIZE + TILE_SIZE / 2,
            y * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE,
            TILE_SIZE,
            0x555555,
          );
          walls.add(wall);
        }
      }
    }

    this.player = this.physics.add
      .sprite(TILE_SIZE * 1.5, TILE_SIZE * 1.5, '')
      .setDisplaySize(TILE_SIZE - 4, TILE_SIZE - 4)
      .setTint(0x00ff00);

    this.goal = this.add.rectangle(
      (MAP_WIDTH - 1.5) * TILE_SIZE,
      (MAP_HEIGHT - 1.5) * TILE_SIZE,
      TILE_SIZE - 4,
      TILE_SIZE - 4,
      0xffff00,
    );
    this.physics.add.existing(this.goal, true);

    this.physics.add.collider(this.player, walls);
    this.physics.add.overlap(
      this.player,
      this.goal,
      () => {
        this.add.text(200, 220, 'You Win!', { color: '#ffffff' });
      },
      undefined,
      this,
    );

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const worldPoint = pointer.positionToCamera(this.cameras.main) as Phaser.Math.Vector2;
      const x = Math.floor(worldPoint.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE / 2;
      const y = Math.floor(worldPoint.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE / 2;

      if (pointer.leftButtonDown()) {
        if (this.portalA) this.portalA.destroy();
        this.portalA = this.add.rectangle(x, y, TILE_SIZE - 4, TILE_SIZE - 4, 0x0000ff);
        this.physics.add.existing(this.portalA, true);
        this.physics.add.overlap(
          this.player,
          this.portalA,
          () => this.teleport('B'),
          undefined,
          this,
        );
      } else if (pointer.rightButtonDown()) {
        if (this.portalB) this.portalB.destroy();
        this.portalB = this.add.rectangle(x, y, TILE_SIZE - 4, TILE_SIZE - 4, 0xff8800);
        this.physics.add.existing(this.portalB, true);
        this.physics.add.overlap(
          this.player,
          this.portalB,
          () => this.teleport('A'),
          undefined,
          this,
        );
      }
    });
  }

  private teleport(target: 'A' | 'B'): void {
    const dest = target === 'A' ? this.portalA : this.portalB;
    if (dest) {
      this.player.setPosition(dest.x, dest.y);
    }
  }

  update(): void {
    const speed = 150;
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    body.setVelocity(0);
    if (this.cursors.left?.isDown) {
      body.setVelocityX(-speed);
    } else if (this.cursors.right?.isDown) {
      body.setVelocityX(speed);
    }

    if (this.cursors.up?.isDown) {
      body.setVelocityY(-speed);
    } else if (this.cursors.down?.isDown) {
      body.setVelocityY(speed);
    }
  }
}

