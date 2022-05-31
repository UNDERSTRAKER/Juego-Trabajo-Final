import p5, { Image } from 'p5';

const SIZE: number = 100;
export default class Minions {
  private x: number = 0;
  private y: number = 0;
  private row: number;
  private col: number;
  private emoguito!: Image;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
    this.updatePositionInPixels();
  }

  emoguitoM(p: p5) {
    for (let i = 0; i < 20; i += 1) {
      const zone: number [] = [0, 25, 50];
      const random = p.random(zone);
      p.imageMode(p.CENTER);
      p.image(this.emoguito, (300 * i) + this.x, (this.row * random) + this.y, 70, 70);
      p.imageMode(p.CORNER);
    }
  }

  move(p: p5) {
    if (p.frameCount % 120 === 0) {
      this.col -= 1;
    }
    this.updatePositionInPixels();
  }

  updatePositionInPixels() {
    this.x = (this.col * SIZE) + SIZE / 2;
    this.y = (this.row * SIZE) + SIZE / 2;
  }

  setEmoguitoImage(emoguito: Image) {
    this.emoguito = emoguito;
  }
}
