/* eslint-disable no-param-reassign */
import './style.css';
import p5, { Image } from 'p5';
import Player from './player';
import Scenario from './scenario';
import Bullet from './bullet';
import Explosion from './explosion';
import Minions from './minions';

const scenario = new Scenario();
const player = new Player(4, 0);
const minions = new Minions(4, 3);
// const minions1 = new Minions(5, 11);
// const minions2 = new Minions(6, 11);
const bullets:Bullet[] = [];
const boomSprites: Image[] = [];
const sprites: Explosion[] = [];
let fondo!: Image;
let monoMov!: Image;
let emoguito!: Image;

const pantalla: number = 4;

const sketch = (p: p5) => {
  p.preload = () => {
    for (let index = 1; index <= 5; index += 1) {
      boomSprites.push(p.loadImage(`../assests/explosion${index}.png`));
    }
    monoMov = p.loadImage('../assests/gorilla.gif');
    player.setmonoMov(monoMov);
    fondo = p.loadImage('../assests/fondoTren.png');
    scenario.setFondoImage(fondo);
    emoguito = p.loadImage('../assests/emoguito.png');
    minions.setEmoguitoImage(emoguito);
  };

  p.setup = () => {
    p.createCanvas(1200, 700);
    player.setScenario(scenario);
  };

  const shoot = () => {
    bullets.forEach((bullet:Bullet, index:number) => {
      bullet.show(p);
      const { result } = scenario.verifyCollision(bullet.getX(), bullet.getY());
      if (result) {
        const boom = new Explosion(bullet.getX(), bullet.getY(), boomSprites);
        boom.run();
        sprites.push(boom);
        bullets.splice(index, 1);
      }
    });
    sprites.forEach((boom) => {
      boom.show(p);
    });
  };

  const pantallas = () => {
    switch (pantalla) {
      case 0:
      // Intro del jeugo
        break;
      case 1:
      // Historia del juego
        break;
      case 2:
      // Seleccion de personajes
        break;
      case 3:
      // Instrucciones
        break;
      case 4:
        // Nivel 1
        scenario.show(p);
        player.show(p);
        minions.emoguitoM(p);
        // minions.move(p);
        shoot();
        break;
      default:
        break;
    }
  };

  p.draw = () => {
    p.background(80);
    pantallas();
    // minions1.emoguitoM(p);
    // minions2.emoguitoM(p);
  };

  p.keyPressed = () => {
    const k = p.key.toLocaleLowerCase();

    if (k === 'q') {
      if (player.activateProtection()) {
        // console.log('I am hulk!!');
      } else {
        // console.log(' F ');
      }
    }

    if (k === 'd') {
      player.move('RIGHT');
    }

    if (k === 'a') {
      player.move('LEFT');
    }

    if (k === 'w') {
      player.move('UP');
    }

    if (k === 's') {
      player.move('DOWN');
    }

    if (k === 'p') {
      const newBullet = player.shootWeapon();
      if (newBullet !== undefined) {
        bullets.push(newBullet);
      } else {
        setTimeout(() => {
          p.textSize(32);
          p.text('No bullets!! Run!!', 100, 100);
        }, 5000);
      }
    }

    if (k === 'o') {
      player.reloadWeapon();
    }
  };
};
// eslint-disable-next-line new-cap
export default new p5(sketch);
