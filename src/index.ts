import './style.scss';
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
      p.background(40);
      p.push();
      // p.fill('#ffffffff')
      // console.log(p.frameCount);
      p.noFill();
      p.stroke(Math.cos(p.frameCount / 100) * 360, 55, 55);
      p.strokeWeight(4);
      p.ellipse(innerWidth / 2, innerHeight / 2, 80);
      p.pop();
   };

   p.windowResized = () => {
      p.resizeCanvas(innerWidth, innerHeight);
   };
};

new p5(sketch);
