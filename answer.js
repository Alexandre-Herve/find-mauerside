import mauerside from './dist/bundle';

// input
const lng = process.argv[2]
const lat = process.argv[3]
const coords = { lat: lat, long: lng };

console.log('coords', coords);

// output
const answer = mauerside(coords);

console.log(answer);
