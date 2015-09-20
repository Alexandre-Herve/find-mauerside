import mauerside from './index.js';

// input
const lng = process.argv[2]
const lat = process.argv[3]
const coords = { lat: lat, long: lng };

// output
const answer = mauerside(coords);

console.log(answer);
