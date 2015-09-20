import writeData from './write-data';
import mauer from './data/coord.json';

const A = mauer[39];
const B = mauer[40];

const fixedMauer = mauer.slice();

fixedMauer[39] = B;
fixedMauer[40] = A;

const wrongIndex = fixedMauer.length - 157;
fixedMauer.splice(wrongIndex, 1);

writeData('fixed-mauer', fixedMauer);


