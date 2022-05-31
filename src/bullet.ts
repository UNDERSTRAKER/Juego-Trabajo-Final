import p5 from 'p5';
import { PlayerDirection } from './types';

export default class Bullet {
  private x!:number;
  private y!:number;
  private direction!:PlayerDirection;
  private aceleration:number = 0.1;
  private speed:number = 1;

  shoot(x:number, y:number, direction:PlayerDirection) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  move() {
    this.x += this.speed;
    this.speed += this.aceleration;
  }

  show(p:p5) {
    p.noStroke();
    p.fill(255);
    p.rectMode(p.CENTER);
    p.rect(this.x + 110, this.y - 20, 20, 5, 5);
    p.rectMode(p.CORNER);
    this.move();
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }
}
