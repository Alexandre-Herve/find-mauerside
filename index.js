import mauer from './coord.json';
import { unit, pipe, bind } from './monad.js';

// constants
const step = 0.0001;

// input
const inputLat = process.argv[2]
const inputLng = process.argv[3]
const coords = { lat: inputLat, lng: inputLng };

// latitiudes
const latitudes = mauer.map((p) => p.lat);
const maxLat = latitudes.reduce((max, l) => Math.max(max, l), 0);
const minLat = latitudes.reduce((min, l) => Math.min(min, l), 100);
const latAmplitude = maxLat - minLat;

// longitudes
const longitudes = mauer.map((p) => p.long);
const maxLng = longitudes.reduce((max, l) => Math.max(max, l), 0);
const minLng = longitudes.reduce((min, l) => Math.min(min, l), 100);
const lngAmplitude = maxLng - minLng;

// output
const formatted = unit(coords, {maxLng, minLng, maxLat, minLat});
const functions = [isNorth, isSouth, isWest, isEast, fineTunning, dunno];
const answer = pipe(formatted, functions)[2];

console.log(answer);


/********************/
/*      STEPS        /
/********************/
function isNorth(coords, boundings) {
  return coords.lat > boundings.maxLat ? 'north' : undefined;
}

function isSouth(coords, boundings) {
  return coords.lat < boundings.minLat ? 'south' : undefined;;
}

function isEast(coords, boundings) {
  return coords.lng > boundings.maxLng ? 'east' : undefined;;
}

function isWest(coords, boundings) {
  return coords.lng < boundings.minLng ? 'west' : undefined;
}

function fineTunning(coords, boundings) {
}

function dunno(coords, boundings) {
  return 'dunno';
}
