import Matter, {
   Engine,
   Runner,
   Render,
   Bodies,
   Composite,
   Body,
   Constraint,
   Common,
   Bounds,
   Mouse,
   Vector,
} from 'matter-js';
// import khroma from 'khroma'
// import _ from 'lodash';
// import { randomHSL } from './utils';
// import gsap from 'gsap';

Common.setDecomp(require('poly-decomp'));

var width = innerWidth;
var height = innerHeight;
var centerX = width / 2;
var centerY = height / 2;
var engine: Engine;
var runner: Runner;
var render: Render;
var options: Matter.IRendererOptions = {
   height,
   width,
   hasBounds: true,
   wireframes: true,
   // showPositions: true,
   // showCollisions: true,
   // showAxes: true,
   // showVelocity: true,
   showAngleIndicator: true,
   // showDebug: true,
   // showVertexNumbers: true,
   // showBroadphase: true,
};

engine = Engine.create();
render = Render.create({
   engine: engine,
   element: document.body,
   options,
   // context:
});
var mouse = Matter.Mouse.create(render.canvas),
   mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
         stiffness: 0.9,
         render: {
            visible: true,
         },
         angularStiffness: 0,
      } as any,
   }),
   world = engine.world,
   runner = Runner.create(),
   zoom = 0,
   viewportCentre = {
      x: render.options.width * 0.5,
      y: render.options.height * 0.5,
   },
   extents = {
      min: { x: -300, y: -300 },
      max: { x: width + 300, y: height + 300 },
   },
   boundsScaleTarget = 1,
   boundsScale = {
      x: 1,
      y: 1,
   };

render.mouse = mouse;

Composite.add(world, mouseConstraint);
Render.run(render);
Runner.run(runner, engine);

const size = 100;
const wallOpt: Matter.IBodyDefinition = {
   isStatic: true,
   render: {
      fillStyle: 'lightblue',
      // lineWidth: 0,
      strokeStyle: 'transparent',
   },
};
// let angle = 0;
const walls = {
   ground: Bodies.rectangle(centerX, height, width * 100, size, wallOpt),
   top: Bodies.rectangle(centerX, 0, width + size, size, wallOpt),
   left: Bodies.rectangle(-size / 2, centerY, size, height + size, wallOpt),
   right: Bodies.rectangle(
      width + size / 2,
      centerY,
      size,
      height + size,
      wallOpt
   ),
};

for (var i in walls) {
   Composite.add(world, walls[i]);
}

Matter.Events.on(engine, 'beforeRender', () => {
   var translate: any;
   var scaleFactor = mouse.wheelDelta * -0.1;
   if (scaleFactor !== 0) {
      if (
         (scaleFactor < 0 && boundsScale.x >= 0.6) ||
         (scaleFactor > 0 && boundsScale.x <= 1.4)
      ) {
         boundsScaleTarget += scaleFactor;
      }
   }

   // if scale has changed
   if (Math.abs(boundsScale.x - boundsScaleTarget) > 0.01) {
      // smoothly tween scale factor
      scaleFactor = (boundsScaleTarget - boundsScale.x) * 0.2;
      boundsScale.x += scaleFactor;
      boundsScale.y += scaleFactor;

      // scale the render bounds
      render.bounds.max.x =
         render.bounds.min.x + render.options.width * boundsScale.x;
      render.bounds.max.y =
         render.bounds.min.y + render.options.height * boundsScale.y;

      // translate so zoom is from centre of view
      translate = {
         x: render.options.width * scaleFactor * -0.5,
         y: render.options.height * scaleFactor * -0.5,
      };

      Matter.Bounds.translate(render.bounds, translate);

      // update mouse
      Matter.Mouse.setScale(mouse, boundsScale);
      Matter.Mouse.setOffset(mouse, render.bounds.min);
   }

   // get vector from mouse relative to centre of viewport
   var deltaCentre = Vector.sub(mouse.absolute, viewportCentre),
      centreDist = Vector.magnitude(deltaCentre);

   // translate the view if mouse has moved over 50px from the centre of viewport
   if (centreDist > 50) {
      // create a vector to translate the view, allowing the user to control view speed
      var direction = Vector.normalise(deltaCentre),
         speed = Math.min(10, Math.pow(centreDist - 50, 2) * 0.0002);

      translate = Vector.mult(direction, speed);

      // prevent the view moving outside the extents
      if (render.bounds.min.x + translate.x < extents.min.x)
         translate.x = extents.min.x - render.bounds.min.x;

      if (render.bounds.max.x + translate.x > extents.max.x)
         translate.x = extents.max.x - render.bounds.max.x;

      if (render.bounds.min.y + translate.y < extents.min.y)
         translate.y = extents.min.y - render.bounds.min.y;

      if (render.bounds.max.y + translate.y > extents.max.y)
         translate.y = extents.max.y - render.bounds.max.y;

      // move the view
      Bounds.translate(render.bounds, translate);

      // we must update the mouse too
      Mouse.setOffset(mouse, render.bounds.min);
   }
});

// let interv: any;
// const ballOption: Matter.IBodyDefinition = {
//    restitution: 0.4,
//    // density: 5,
//    // friction: 10,
//    // frictionStatic: 10,
//    render: {
//       lineWidth: 2,
//       strokeStyle: 'lime',
//       fillStyle: 'transparent',
//    },
// };

var svg2 = require('./svg/svgexport-2.svg');
var paths = Array.from(
   new DOMParser()
      .parseFromString(svg2, 'image/svg+xml')
      .querySelectorAll('path')
);
var verticeSet = paths.map((p) => Matter.Svg.pathToVertices(p, 30));
// console.log(verticeSet);
var terrain = Bodies.fromVertices(0, centerY, verticeSet, {
   isStatic: true,
   render: {
      fillStyle: 'yellow',
      strokeStyle: 'yellow',
   },
});
Body.scale(terrain, 5, 5);
// Composite.add(world, terrain);
