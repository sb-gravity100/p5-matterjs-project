import './style.scss';
const { noise } = require('@chriscourses/perlin-noise');
import p5 from 'p5';

const sketch = (p: p5) => {
   p.preload = () => {
      p.frameRate(30);
      p.colorMode('hsl');
   };
   p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.background(40);
   };

   p.draw = () => {
      // console.log(performance.now());
      p.clear();
      p.background(40);
      p.push();
      p.noFill();
      p.stroke(360, 55, 55);
      p.strokeWeight(4);
      p.ellipse(
         Math.floor(noise(performance.now() / 10000, 0) * innerWidth),
         Math.floor(noise(0, performance.now() / 10000) * innerHeight),
         80
      );
      p.pop();
   };

   p.windowResized = () => {
      p.resizeCanvas(innerWidth, innerHeight);
   };
};

function start() {
   new p5(sketch);
}

start();
