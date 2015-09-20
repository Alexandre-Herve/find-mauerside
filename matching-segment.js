import eastWall from 'json!./computed-data/east-wall.json'; 
import westWall from 'json!./computed-data/west-wall.json'; 

export default function getSide(coords) {

  const distanceEast = getMinimalDistance(eastWall, coords);
  const distanceWest = getMinimalDistance(westWall, coords);

  if (distanceWest < distanceEast) {
    return 'west';
  } else if (distanceWest > distanceEast) {
    return 'east';
  } else {
    return undefined;
  }
}

function getMinimalDistance(wall, coords) {
  const matches = findMatchingSegments(wall, coords);
  const distances = matches.map((match) => getDistance(match, coords));
  return Math.min.apply(null, distances);
}

function findMatchingSegments(wall, coords) {
  const segments = makeSegments(wall);
  const lat = coords.lat;
  return segments.reduce(function(matches, segment) {
    if (isSegmentMatchingLat(segment, lat)) {
      matches.push(segment);
    }
    return matches;
  }, []);
}

function makeSegments(wall) {
  const wallNotLast = wall.slice(0, wall.length - 1);
  return wallNotLast.map(function(point, index) {
    return [wall[index], wall[index + 1]];
  });
}

function isSegmentMatchingLat(segment, lat) {
  return segment[0].y <= lat && segment[1].y >= lat ||
    segment[0].y >= lat && segment[1].y <= lat;
}

function getDistance(segment, coords) {
  return dotLineLength(
    coords.long,
    coords.lat,
    segment[0].x,
    segment[0].y,
    segment[1].x,
    segment[1].y,
    true
  );
}

function dotLineLength (x, y, x0, y0, x1, y1, o) {
  function lineLength(x, y, x0, y0){
    return Math.sqrt((x -= x0) * x + (y -= y0) * y);
  }
  if(o && !(o = function(x, y, x0, y0, x1, y1){
    if(!(x1 - x0)) return {x: x0, y: y};
    else if(!(y1 - y0)) return {x: x, y: y0};
    var left, tg = -1 / ((y1 - y0) / (x1 - x0));
    return {x: left = (x1 * (x * tg - y + y0) + x0 * (x * - tg + y - y1)) / (tg * (x1 - x0) + y0 - y1), y: tg * left - tg * x + y};
  }(x, y, x0, y0, x1, y1), o.x >= Math.min(x0, x1) && o.x <= Math.max(x0, x1) && o.y >= Math.min(y0, y1) && o.y <= Math.max(y0, y1))){
    var l1 = lineLength(x, y, x0, y0), l2 = lineLength(x, y, x1, y1);
    return l1 > l2 ? l2 : l1;
  }
  else {
    var a = y0 - y1, b = x1 - x0, c = x0 * y1 - y0 * x1;
    return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
  }
};
