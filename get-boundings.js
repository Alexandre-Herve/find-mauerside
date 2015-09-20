import mauer from './computed-data/fixed-wall.json';

// latitiudes
const latitudes = mauer.map((p) => p.lat);
const maxLat = latitudes.reduce((max, l) => Math.max(max, l), 0);
const minLat = latitudes.reduce((min, l) => Math.min(min, l), 100);

// longitudes
const longitudes = mauer.map((p) => p.long);
const maxLng = longitudes.reduce((max, l) => Math.max(max, l), 0);
const minLng = longitudes.reduce((min, l) => Math.min(min, l), 100);

export default {
  maxLng,
  minLng,
  maxLat,
  minLat
}
