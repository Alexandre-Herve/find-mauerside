import { unit, pipe, bind } from './monad';
import boundings from './get-boundings';
import matchingSegment from './matching-segment';

export default function mauerside(coords) {
  const formatted = unit(coords, boundings);
  const functions = [isNorth, isSouth, isWest, isEast, fineTunning, dunno];
  return pipe(formatted, functions)[2];
}

function isNorth(coords, boundings) {
  return coords.lat > boundings.maxLat ? 'north' : undefined;
}

function isSouth(coords, boundings) {
  return coords.lat < boundings.minLat ? 'south' : undefined;
}

function isEast(coords, boundings) {
  return coords.lng > boundings.maxLng ? 'east' : undefined;
}

function isWest(coords, boundings) {
  return coords.lng < boundings.minLng ? 'west' : undefined;
}

function fineTunning(coords, boundings) {
  return matchingSegment(coords);
}

function dunno(coords, boundings) {
  return 'dunno';
}

