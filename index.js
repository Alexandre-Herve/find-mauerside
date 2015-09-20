import mauerside from './mauerside';

// input
const long = process.argv[2]
const lat = process.argv[3]
const coords = { lat, long };

// output
const answer = mauerside(coords);

console.log(answer);
