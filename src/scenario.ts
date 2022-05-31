import p5, { Image } from 'p5';

const SIZE = 100;

export default class Scenario {
  private matriz: Array<Array<number>> = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  private fondo!:Image;

  show(p: p5) {
    p.image(this.fondo, 0, 0);
    this.matriz.forEach((arrow, a) => {
      arrow.forEach((cell, c) => {
        if (cell === 0) {
          p.strokeWeight(4);
          p.stroke(255, 0, 0);
          p.noFill();
          p.rect(c * SIZE, a * SIZE, SIZE, SIZE);
        }
        if (cell === 1) {
          p.strokeWeight(1);
          p.stroke(0);
          p.noFill();
          p.rect(c * SIZE, a * SIZE, SIZE, SIZE);
        }
      });
    });
  }

  isFreeSpace(row:number, col:number):boolean {
    if (this.isValidBlockPosition(row, col) === false) {
      return false;
    }
    let result = false;
    switch (this.matriz[row][col]) {
      case 0:
        result = false;
        break;
      case 1:
        result = true;
        break;
      default:
        break;
    }
    return result;
  }

  verifyCollision(x:number, y:number) {
    const row = Math.floor(y / 100);
    const col = Math.floor(x / 100);
    const result = !this.isFreeSpace(row, col);
    return {
      result,
      row,
      col,
    };
  }

  isValidBlockPosition(row:number, col:number):boolean {
    return !(row >= this.matriz.length || row < 0
      || col >= this.matriz[row].length || col < 0);
  }

  setFondoImage(fondo: Image) {
    this.fondo = fondo;
  }
}
