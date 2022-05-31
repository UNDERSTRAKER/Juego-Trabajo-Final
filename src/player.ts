import p5, { Image } from 'p5';
import Scenario from './scenario';
import Weapon from './weapon';
import { PlayerDirection } from './types';

const SIZE = 100;
export default class Player {
  private x: number = 0;
  private y: number = 0;
  private row: number = 0;
  private col: number = 0;
  private isProtected: boolean = false;
  private isShieldEnable: boolean = true;
  private refScenario: Scenario | null = null;
  private weapon!:Weapon;
  private direction:PlayerDirection = 'RIGHT';

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.updatePositionInPixels();
    this.weapon = new Weapon(this.x, this.y);
  }

  showShield(p: p5) {
    p.fill(0, 0, 255, 20);
    p.circle(this.x, this.y, 100);
  }

  private monoMov!: Image;

  show(p: p5) {
    p.imageMode(p.CENTER);
    p.image(this.monoMov, this.x + 30, this.y - 20, 150, 120);
    p.imageMode(p.CORNER);
    if (this.isProtected) {
      this.showShield(p);
    }
  }

  activateProtection() {
    let result = false;
    if (this.isShieldEnable) {
      this.isProtected = true;
      this.isShieldEnable = false;
      this.deactivateAsync();
      result = true;
    }
    return result;
  }

  deactivateAsync() {
    setTimeout(() => {
      this.deactivateProtection();
      this.enableShield();
    }, 2000);
  }

  enableShield() {
    setTimeout(() => {
      this.isShieldEnable = true;
    }, 4000);
  }

  deactivateProtection() {
    this.isProtected = false;
  }

  shootWeapon() {
    return this.weapon.shoot();
  }

  reloadWeapon() {
    this.weapon.reloadBullets();
  }

  move(direction: PlayerDirection) {
    switch (direction) {
      case 'RIGHT':
        if (this.refScenario?.isFreeSpace(this.row, this.col + 1)) {
          this.col += 1;
        }
        break;
      case 'LEFT':
        if (this.refScenario?.isFreeSpace(this.row, this.col - 1)) {
          this.col -= 1;
        }
        break;
      case 'UP':
        if (this.refScenario?.isFreeSpace(this.row - 1, this.col)) {
          this.row -= 1;
        }
        break;
      case 'DOWN':
        if (this.refScenario?.isFreeSpace(this.row + 1, this.col)) {
          this.row += 1;
        }
        break;
      default:
        break;
    }
    this.direction = direction;
    this.updatePositionInPixels();
    this.weapon.updatePositionInPixels(this.x, this.y);
    this.weapon.setDirection(this.direction);
  }

  updatePositionInPixels() {
    this.x = (this.col * SIZE) + SIZE / 2;
    this.y = (this.row * SIZE) + SIZE / 2;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setScenario(scenario: Scenario) {
    this.refScenario = scenario;
  }

  setmonoMov(monoMov: Image) {
    this.monoMov = monoMov;
  }
}
