import Matter, {
   Engine,
   Runner,
   Render,
   Bodies,
   Composite,
   Body,
   Constraint,
} from 'matter-js';
// import khroma from 'khroma'
import _ from 'lodash';
import { randomHSL } from './utils';
import gsap from 'gsap';

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
   wireframes: false,
   // showPositions: true,
   // showCollisions: true,
   // showAxes: true,
   // showVelocity: true,
   showAngleIndicator: true,
   showDebug: true,
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
   zoom = 100;
render.mouse = mouse;

Composite.add(world, mouseConstraint);
Render.run(render);
Runner.run(runner, engine);
Render.lookAt(render, {
   min: { x: -zoom, y: -zoom },
   max: { x: innerWidth + zoom, y: innerHeight + zoom },
});

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
   // top: Bodies.rectangle(centerX, 0, width + size, size, wallOpt),
   // left: Bodies.rectangle(-size / 2, centerY, size, height + size, wallOpt),
   // right: Bodies.rectangle(
   //    width + size / 2,
   //    centerY,
   //    size,
   //    height + size,
   //    wallOpt
   // ),
};

for (var i in walls) {
   Composite.add(world, walls[i]);
}

let interv: any;
const ballOption: Matter.IBodyDefinition = {
   restitution: 0.4,
   // density: 5,
   // friction: 10,
   // frictionStatic: 10,
   render: {
      lineWidth: 2,
      strokeStyle: 'lime',
      fillStyle: 'transparent',
   },
};

var collider = Bodies.rectangle(centerX, centerY, 500, 50, {
   // isSensor: true,
   // isStatic: true,
   render: {
      strokeStyle: 'red',
      fillStyle: 'transparent',
      lineWidth: 2,
   },
   // angle: 0.1,
   // frictionAir: 0,
   // frictionStatic: 0,
   // friction: 0,
});
var const1 = Matter.Constraint.create({
   pointA: Matter.Vector.create(centerX, centerY),
   bodyB: collider,
   length: 0,
});

Composite.add(world, [collider, const1]);

function createCar(xx: number, yy: number, w: number, wheelSize: number) {
   var height = wheelSize * 0.8;
   var width = wheelSize * 2 + w;
   var group = Body.nextGroup(true),
      wheelBase = 10,
      wheelAOffset = -width * 0.5 + wheelBase,
      wheelBOffset = width * 0.5 - wheelBase,
      wheelYOffset = 0;

   var car = Composite.create({ label: 'Car' }),
      body = Bodies.rectangle(xx, yy, width, height, {
         collisionFilter: {
            group: group,
         },
         chamfer: {
            radius: height * 0.5,
         },
         density: 0.0002,
         label: 'body',
      });

   var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
      collisionFilter: {
         group: group,
      },
      friction: 1,
      label: 'wheel',
   });

   var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
      collisionFilter: {
         group: group,
      },
      friction: 1,
      label: 'wheel',
   });

   var axelA = Constraint.create({
      bodyB: body,
      pointB: { x: wheelAOffset, y: wheelYOffset },
      bodyA: wheelA,
      stiffness: 1,
      length: 0,
   });

   var axelB = Constraint.create({
      bodyB: body,
      pointB: { x: wheelBOffset, y: wheelYOffset },
      bodyA: wheelB,
      stiffness: 1,
      length: 0,
   });

   Composite.add(car, body);
   Composite.add(car, wheelA);
   Composite.add(car, wheelB);
   Composite.add(car, axelA);
   Composite.add(car, axelB);

   return car;
}

const car = createCar(
   centerX,
   centerY - 200,
   Matter.Common.random(50, 100),
   Matter.Common.random(20, 50)
);
Composite.add(world, car);

addEventListener('click', () => {
   clearInterval(interv);
   const { x, y } = mouse.mouseupPosition;
   const radius = Matter.Common.random(20, 50);
   // car.torque
   // const b = Bodies.circle(
   //    x,
   //    y,
   //    radius,
   //    _.merge(ballOption, {
   //       torque: Math.random(),
   //    }),
   //    100
   // );
   // Composite.add(world, b);
   // // gsap.to(b, {
   // //    duration: 12,
   // //    torque: 1,
   // // });
   // // setTimeout(() => {
   // //    Composite.remove(world, b);
   // // }, 10000);
});

// addEventListener('mousedown', () => {
//    interv = setInterval(() => {
//       const { x, y } = mouse.position
//       Object.assign(ballOption, {
//          render: {
//             strokeStyle: randomHSL(null, 60, 60)
//          }
//       })
//       const b = Bodies.circle(x, y, Matter.Common.random(1, 8), ballOption)
//       Composite.add(world, b)
//       setTimeout(() => {
//          Composite.remove(world, b)
//       }, 9000)
//    }, 1)
// })

addEventListener('keydown', (e) => {
   // const { x, y } = mouse.position;
   // Object.assign(ballOption, {
   //    render: {
   //       strokeStyle: randomHSL(null, 60, 60),
   //    },
   // });
   // const b = Bodies.circle(x, y, Matter.Common.random(1, 8), ballOption);
   // Composite.add(world, b);
   // setTimeout(() => {
   //    Composite.remove(world, b);
   // }, 9000);
   car.bodies.forEach((b) => {
      if (b.label === 'wheel') {
         if (e.key === 'ArrowLeft') {
            b.torque = -0.8;
         }
         if (e.key === 'ArrowRight') {
            b.torque = 0.8;
         }
      }
   });
});

Matter.Events.on(engine, 'collisionStart', () => {
   const body = car.bodies.find((e) => e.label === 'body');
   Render.lookAt(render, {
      bounds: {
         min: {
            x: body.bounds.min.x - innerWidth / 2,
            y: body.bounds.min.y - innerWidth / 2,
         },
         max: {
            x: body.bounds.max.x + innerWidth / 2,
            y: body.bounds.max.y + innerWidth / 2,
         },
      },
   });
});

// Matter.Events.on(engine, 'collisionStart', e => {
//    console.log(e.source)
//    e.pairs.forEach(p => {
//       if (p.bodyA.id === collider.id || p.bodyB.id === collider.id) {
//          p.bodyA.render.strokeStyle = 'yellow'
//          p.bodyB.render.strokeStyle = 'yellow'
//       }
//    })
// })
// Matter.Events.on(engine, 'collisionEnd', e => {
//    console.log(e.source)
//    const list = e.pairs
//    e.pairs.forEach(p => {
//       if (p.bodyA.id === collider.id || p.bodyB.id === collider.id) {
//          if (p.bodyA.id === collider.id) {
//             p.bodyA.render.strokeStyle = 'red'
//             p.bodyB.render.strokeStyle = 'lime'
//          } else {
//             p.bodyA.render.strokeStyle = 'lime'
//             p.bodyB.render.strokeStyle = 'red'
//          }
//       }
//    })
// })
