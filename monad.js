export default {
  unit,
  pipe,
  bind
}

function unit(coords, boundings) {
  return [coords, boundings, undefined];
}

function pipe(x, functions) {
  for (var i = 0, n = functions.length; i < n; i++) {
    x = bind(x, functions[i]);
  }
  return x;
};

function bind(triplet, f) {
  const coords = triplet[0];
  const boundings = triplet[1];
  const output = triplet[2] ? triplet[2] : f(coords, boundings);
  return [coords, boundings, output];
}

