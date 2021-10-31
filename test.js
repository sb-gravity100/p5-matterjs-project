const { makeNoise2D } = require('open-simplex-noise');

const noise = makeNoise2D(5);
const width = 15;
const height = 10;

for (let x = 0; x < width; x++) {
   for (let y = 0; y < height; y++) {
      console.log(Math.abs(Math.floor(noise(x, y) * 10)));
   }
}
