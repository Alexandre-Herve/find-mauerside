import mauerside from './mauerside';

// input
const lat = process.argv[2]
const lng = process.argv[3]
const coords = { lat, lng };

// output
const answer = mauerside(coords);

console.log(answer);

