import Bullet from './bullet';
import { PlayerDirection } from './types';

export default class Weapon {
  private x!:number;
  private y!:number;
  private direction!:PlayerDirection;
  private angle:number = 0;
  private ammunition:Bullet[] = [];

  constructor(x:number, y:number) {
    this.x = x;
    this.y = y;
    this.direction = 'UP';
    this.reloadBullets();
  }

  reloadBullets() {
    for (let index = 0; index < 10; index += 1) {
      this.ammunition.push(new Bullet());
    }
  }

  shoot() {
    const bullet = this.ammunition.pop();
    if (bullet !== undefined) {
      const xWeaponOffset = this.defineOffsetX();
      bullet.shoot(this.x + xWeaponOffset, this.y, this.direction);
    }
    return bullet;
  }

  defineOffsetX() {
    let result = 0;
    if (this.direction === 'RIGHT') {
      result = +30;
    }
    return result;
  }

  setOrientation() {
    switch (this.direction) {
      case 'RIGHT':
        this.angle = Math.PI / 2;
        break;
      default:
        break;
    }
  }

  updatePositionInPixels(newX:number, newY:number) {
    this.x = newX;
    this.y = newY;
  }

  setDirection(direction : PlayerDirection) {
    this.direction = direction;
    this.setOrientation();
  }
}
