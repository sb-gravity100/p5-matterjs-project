import { LoDashStatic } from 'lodash';

declare module '*.svg' {
   const data: string;
   export default data;
}

interface Perlin {
   noise(x: number, y?: number, z?: number): number;
   noiseDetail(lod: number, falloff: number): void;
   noiseSeed(seed: number): void;
}
declare var perlin: Perlin;
declare var _times: LoDashStatic['times'];
declare var _chain: LoDashStatic['chain'];
