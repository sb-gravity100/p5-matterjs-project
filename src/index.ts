import './style.scss';
const { noise } = require('@chriscourses/perlin-noise');
import p5 from 'p5';
import { Engine, Bodies, Body, Composite } from 'matter-js';
import _ from 'lodash';

const sketch = (p: p5) => {
   let ts = 0;
   let frameCount = 0;
   let engine = Engine.create();
   let circles: Body[] = [];
   p.preload = () => {
      p.frameRate(60);
      p.colorMode('hsl');
   };
   p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.background(40);
      circles = _.times(20, (n) =>
         Bodies.circle(
            Math.random() * innerWidth,
            Math.random() * innerHeight,
            Math.random() * 70 + 10,
            {
               plugin: {
                  color: `hsla(${Math.random() * 360}, 59, 55)`,
               },
            }
         )
      );
      Composite.add(engine.world, circles);
   };

   p.draw = () => {
      ts = performance.now();
      frameCount = p.frameCount;

      Engine.update(engine, 1000 / 60);

      p.clear();
      p.background('rgba(0, 0, 0, 0.2)');

      circles.forEach((cir) => {
         p.push();
         p.noFill();
         p.stroke(cir.plugin.color);
         p.strokeWeight(4);
         p.ellipse(cir.position.x, cir.position.y, cir.circleRadius);
         p.pop();
      });
   };

   p.windowResized = () => {
      p.resizeCanvas(innerWidth, innerHeight);
   };
};

function start() {
   new p5(sketch);
}

start();
