import p5 from 'p5'; 
// import gsap from 'gsap';
// import _ from 'lodash'
import { Engine, Runner, Render, Bodies, Vector, Composite, Body } from 'matter-js'

type P = (p: p5) => any;

var engine: Engine
var sketch: P

function init() {
   engine = Engine.create()

   sketch = p => {
      const fps = 60;
      let ts = 0;

      function drawFirst() {
         ts = performance.now();
         Engine.update(engine, 1000 / fps)
         p.clear()
         p.background(0, 60, 55);
      }

      p.preload = () => {
         p.frameRate(fps);
      };

      p.setup = () => {
         p.background(0, 60, 55);
         p.createCanvas(innerWidth, innerHeight);
      };

      p.windowResized = () => {
         p.resizeCanvas(innerWidth, innerHeight);
      };

      p.draw = () => {
         drawFirst()
      };
   };

   new p5(sketch);
}
// init()
