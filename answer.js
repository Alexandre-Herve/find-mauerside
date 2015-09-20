import findMauerside from './dist/bundle.js';

// input
const lng = process.argv[2]
const lat = process.argv[3]
const coords = { lat: lat, long: lng };

// output
const answer = findMauerside(coords);

console.log(answer);
