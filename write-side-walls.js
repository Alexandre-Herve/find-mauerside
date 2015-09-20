import getSideWalls from './get-side-walls';
import writeData from './write-data';

const sideWalls = getSideWalls();

writeData('east-wall', sideWalls.map((i) => i[0]));
writeData('west-wall', sideWalls.map((i) => i[1]));
