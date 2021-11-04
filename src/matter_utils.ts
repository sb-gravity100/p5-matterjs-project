import { Body, Composite, Bodies, Constraint } from 'matter-js';

export function createCar(
   xx: number,
   yy: number,
   w: number,
   wheelSize: number
) {
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
